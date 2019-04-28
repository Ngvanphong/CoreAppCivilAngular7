import { Component, OnInit } from '@angular/core';
import { AuthenService } from '../../core/service/authen.service';
import { UtilityService } from '../../core/service/utility.service'
@Component({
  selector: 'app-changepass',
  templateUrl: './changepass.component.html',
  styleUrls: ['./changepass.component.css']
})
export class ChangepassComponent implements OnInit {

  public entity: any = {};
  public isConfirm: boolean = true;

  constructor(private _authenService: AuthenService, private _utilityService: UtilityService) { }

  ngOnInit() {
  }

  public saveChanges(valid: boolean) {
    if (valid) {
      this._authenService.changePass(this.entity.UserName, this.entity.OldPass, this.entity.NewPass).subscribe(res => {
        if (res != undefined) this._utilityService.navigateToLogin();
      });
    }
  }

  public ConfirmPass() {
    if (this.entity.NewPass == this.entity.Confirmpassword) {
      this.isConfirm = true;
    }
    else {
      this.isConfirm = false;
    }
  }


}
