import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { NotificationService } from './notification.service';
import { MessageConstant } from '../common/message.constant';
import { SystemConstant } from '../common/system.constant'
import { AuthenService } from './authen.service'
import { tap, catchError } from 'rxjs/operators';
import {UtilityService} from './utility.service'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private _http: HttpClient, private _notificationService: NotificationService, private _authenService: AuthenService
    , private _utilityService :UtilityService
    ) { }

  get(uri: string) { 
    let reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this._authenService.getUserLogin().access_token
   });
    return this._http.get(SystemConstant.BASE_API + uri,{ headers: reqHeader }).pipe(
      tap(),
      catchError(this._notificationService.handleError<any>("error"))
    )
  };

  getString(uri: string, key: string, id: string) {
    let reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this._authenService.getUserLogin().access_token
   });
    return this._http.get(SystemConstant.BASE_API + uri + "/?" + key + "=" + id, { headers: reqHeader }).pipe(
      tap(
      ),
      catchError(
        this._notificationService.handleError<any>("Not found")
      )
    )
  };

  post(uri: string, data?: any) {
    let reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this._authenService.getUserLogin().access_token
   });
    return this._http.post(SystemConstant.BASE_API + uri, data, { headers: reqHeader }).pipe(
      tap(
        (res: any) => {
          this._notificationService.printSuccesMessage(MessageConstant.CREATE_OK_MEG);
        }
      ),
      catchError(
        this._notificationService.handleError<any>("Not success")
      )
    )
  };

  put(uri: string, data?: any) {
    let reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this._authenService.getUserLogin().access_token
   });
    return this._http.put(SystemConstant.BASE_API + uri, data, { headers: reqHeader }).pipe(
      tap(
        (res: any) => {
          this._notificationService.printSuccesMessage(MessageConstant.UPDATE_OK_MEG);
        }
      ),
      catchError(
        this._notificationService.handleError<any>("Not success")
      )
    )
  };

  delete(uri: string, key: string, id: string) {
    let reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this._authenService.getUserLogin().access_token
   });
    return this._http.delete(SystemConstant.BASE_API + uri + "?" + key + "=" + id,{ headers: reqHeader }).pipe(
      tap(
        (res: any) => {
          this._notificationService.printSuccesMessage(MessageConstant.DELETE_OK_MEG);
        }
      ),
      catchError(
        this._notificationService.handleError<any>("Not success")
      )
    )
  };

  deleteAllTagNotUse(uri: string) {
    let reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this._authenService.getUserLogin().access_token
   });
    return this._http.delete(SystemConstant.BASE_API + uri, { headers: reqHeader }).pipe(
      tap(
        (res: any) => {
          this._notificationService.printSuccesMessage(MessageConstant.DELETE_OK_MEG);
        }
      ),
      catchError(
        this._notificationService.handleError<any>("Not success")
      )
    )
  };

  deleteWithMultiParams(uri: string, params) {
    let reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this._authenService.getUserLogin().access_token
   });
    var paramStr: string = '';
    for (let param in params) {
      paramStr += param + "=" + params[param] + '&';
    }
    return this._http.delete(SystemConstant.BASE_API + uri + "/?" + paramStr, { headers: reqHeader }).pipe(
      tap(
        (res: any) => {
          this._notificationService.printSuccesMessage(MessageConstant.DELETE_OK_MEG);
        }
      ),
      catchError(
        this._notificationService.handleError<any>("Not success")
      )
    )
  };

  postFile(uri: string, data?: any) {
    let reqHeader = new HttpHeaders({ 
      'Authorization': 'Bearer ' + this._authenService.getUserLogin().access_token
   });    
    return this._http.post(SystemConstant.BASE_API + uri, data,{ headers: reqHeader }).pipe(
      tap(    
      ),
      catchError(
        this._notificationService.handleError<any>("Not success")
      )
    )
  };
  
  public handleErrorComponent(error: any) {
    if (error.status == 401) {
      localStorage.removeItem(SystemConstant.CURRENT_USER);
      this._notificationService.printErrorMessage(MessageConstant.LOGIN_AGAIN_MEG);
      this._utilityService.navigateToLogin();
    }
    else if (error.status == 403) {
      localStorage.removeItem(SystemConstant.CURRENT_USER);
      this._notificationService.printErrorMessage(MessageConstant.FORBIDDEN);
      this._utilityService.navigateToLogin();
    }
    else {
      let errMsg = JSON.parse(error._body).Message;
      this._notificationService.printErrorMessage(errMsg);
      return Observable.throw(errMsg);
    }
  };
  


}
