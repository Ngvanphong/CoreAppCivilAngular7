import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { DataService } from '../../core/service/data.service';
import { UtilityService } from '../../core/service/utility.service';
import { NgForm } from '@angular/forms';
import { NotificationService } from '../../core/service/notification.service';
import { MessageConstant } from '../../core/common/message.constant';
import {AuthenService} from '../../core/service/authen.service';
@Component({
  selector: 'app-funtion',
  templateUrl: './funtion.component.html',
  styleUrls: ['./funtion.component.css']
})
export class FuntionComponent implements OnInit {
  @ViewChild('addEditModal') private addEditModal: ModalDirective;
  @ViewChild('permissionModal') private permissionModal: ModalDirective;
  public _functions: any[];
  public _functionHierachy: any[];
  public filter: string = '';
  public entity: any;
  public editFlag: boolean;
  public _permission: any[];
  public functionId: string;
  private arryfuntion:any[]=[];
  constructor(private _dataService: DataService, private _utilityService: UtilityService, private _notificationService: NotificationService,
    public _authenService:AuthenService) { }

  ngOnInit() {
    this.search();
  }

  public search() {
    this._dataService.get('/api/function/getall?filter=' + this.filter)
      .subscribe((response: any[]) => {
        this._functions = response.filter(x => x.ParentId == null);
        this.arryfuntion=response.filter(x => x.ParentId == null);
        this._functionHierachy = this._utilityService.Unflatten(response);
      });
  };

  public showAdd() {
    this.entity = { Status: true };
    this._functions=this.arryfuntion;
    this.addEditModal.show();
    this.editFlag = false;
  }

  public showEdit(id: string) {
    this.entity = {};
    this._dataService.get("/api/function/detail/" + id).subscribe((res: any) => {
      if (res != undefined) {
        this.entity = res;
        this._functions=this.arrayRemove(this.arryfuntion,this.entity.Id);
        this.editFlag = true;
        this.addEditModal.show();
      }
    })
  };

  private arrayRemove(arr, value) {
    return arr.filter(function(ele){
        return ele.Id != value;
    });
 }

  public showPermission(id: any) {
    this.functionId = id
    this._dataService.get("/api/function/getAllPermission?functionId=" + id).subscribe((res: any[]) => {
      if (res != undefined) {
        this._permission = res;
        this.permissionModal.show();
      }
    })
  }

  public savePermission(valid: boolean, _permission: any[]) {
    if (valid) {
      var data = {
        Permissions: this._permission,
        FunctionId: this.functionId
      }
      this._dataService.post('/api/function/savePermission', JSON.stringify(data)).subscribe((res: any) => {
        if (res != undefined) {
          this.permissionModal.hide();
        }
      });
    }
  }

  private deleteConfirm(id: any) {
    this._dataService.delete("/api/function/delete", 'id', id).subscribe((res: any) => {
      this.search();
    });
  }
  public delete(id: any) {
    this._notificationService.printConfirmationDialog(MessageConstant.CONFIRM_DELETE_MEG, () => this.deleteConfirm(id))
  }

  public saveChanges(form: NgForm) {
    if (form.valid) {
      if (this.editFlag) {
        this._dataService.put("/api/function/update", JSON.stringify(this.entity)).subscribe(res => {
          if (res != undefined) {
            this.addEditModal.hide();
            this.search();
            form.resetForm();
          }
        })
      }
      else {
        this._dataService.post("/api/function/add", JSON.stringify(this.entity)).subscribe(res => {
          if (res != undefined) {
            this.addEditModal.hide();
            this.search();
            form.resetForm();
          }
        })
      }
    }
  }

}
