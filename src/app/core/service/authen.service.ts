import { Injectable } from '@angular/core';
import { LoggedInUser } from '../domain/loginin.user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SystemConstant } from '../common/system.constant';
import { catchError, map, tap } from 'rxjs/operators';
import { NotificationService } from './notification.service';
import {UtilityService} from './utility.service' 
import {UrlConstant} from '../common/url.constant'

const _httpOptionLogin = {
  headers: new HttpHeaders({
     'Content-Type': 'application/x-www-form-urlencoded'
 })
};
@Injectable({
  providedIn: 'root'
})
export class AuthenService {

  constructor(private _http: HttpClient, private _notificationService: NotificationService, private _utilityService:UtilityService) {

  }
  login(userName: string, password: string, rememberMe: boolean) {
    let body = "userName=" + encodeURIComponent(userName) + "&password=" + encodeURIComponent(password)
      + "&rememberMe=" + rememberMe + "&grant_type=password";     
    return this._http.post(SystemConstant.BASE_API + '/api/Account/login', body, _httpOptionLogin)
      .pipe(      
        tap(
          (res: any) => {
            if (res.token) {
              localStorage.removeItem(SystemConstant.CURRENT_USER);
              localStorage.removeItem(SystemConstant.CURRENT_TOKEN)
              localStorage.setItem(SystemConstant.CURRENT_USER,JSON.stringify(res.userLogin));
              localStorage.setItem(SystemConstant.CURRENT_TOKEN,JSON.stringify(res.token));
              this._utilityService.navigate(UrlConstant.PRODUCT);            
            }
          }
        ),
        catchError(
          this._notificationService.handleError<any>("Account isn't correct")
        )     
      );
  }

  logout() {
    localStorage.removeItem(SystemConstant.CURRENT_USER);
  }

  changePass(userName:string,oldPass:string,newPass:string) {
    let body ="username=" + encodeURIComponent(userName) + "&oldpass=" + encodeURIComponent(oldPass) + "&newpass=" + encodeURIComponent(newPass)
    + "&grant_type=password";     
    let reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Bearer ' + this.getUserLogin().access_token
   });
  return this._http.post(SystemConstant.BASE_API + '/api/appUser/changepassword', body, { headers: reqHeader })
    .pipe(      
      tap(
        (res: any) => {
         this._notificationService.printSuccesMessage("Đổi mật khẩu thành công");
         this.logout();          
        }
      ),
      catchError(
        this._notificationService.handleError<any>("Account isn't correct")
      )     
    );
  }

  isUserAuthenticated(): boolean {
    let user = localStorage.getItem(SystemConstant.CURRENT_USER);
    if (user != null) { return true }
    else
      return false;
  };

  getUserLogin(): LoggedInUser {
    let user: LoggedInUser;
    if (this.isUserAuthenticated() == true) {
      var UserData = JSON.parse(localStorage.getItem(SystemConstant.CURRENT_USER));
      var accessToken=JSON.parse(localStorage.getItem(SystemConstant.CURRENT_TOKEN))
      user = new LoggedInUser(accessToken, UserData.username, UserData.fullName,
        UserData.email, UserData.avatar, UserData.roles, UserData.permissions);
    }
    else
      user = null;
    return user;
  }

  checkAccess(functionId: string) {
    var user = this.getUserLogin();
    var permission: any[] = JSON.parse(user.permissions);
    var roles: any[] = JSON.parse(user.roles);
    var hasPermission: number = permission.findIndex(x => x.FunctionId == functionId && x.CanRead == true);
    if (hasPermission != -1 || roles.findIndex(x => x == "Admin") != -1) {
      return true;
    }
    else
      return false;
  }

  hasPermission(functionId: string, action: string): boolean {
    var user = this.getUserLogin();
    var result: boolean = false;
    var permission: any[] = JSON.parse(user.permissions);
    var roles: any[] = JSON.parse(user.roles);
    switch (action) {
      case 'create':
        var hasPermission: number = permission.findIndex(x => x.FunctionId == functionId && x.CanCreate == true);
        if (hasPermission != -1 || roles.findIndex(x => x == "Admin") != -1)
          result = true;
        break;
      case 'update':
        var hasPermission: number = permission.findIndex(x => x.FunctionId == functionId && x.CanUpdate == true);
        if (hasPermission != -1 || roles.findIndex(x => x == "Admin") != -1)
          result = true;
        break;
      case 'delete':
        var hasPermission: number = permission.findIndex(x => x.FunctionId == functionId && x.CanDelete == true);
        if (hasPermission != -1 || roles.findIndex(x => x == "Admin") != -1)
          result = true;
        break;
    }
    return result;
  }
}
