import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../../core/service/data.service';
import { NotificationService } from '../../core/service/notification.service';
import { MessageConstant } from '../../core/common/message.constant';
import { ModalDirective } from 'ngx-bootstrap';
import { NgForm } from '@angular/forms';
import {AuthenService} from '../../core/service/authen.service';
declare var moment: any;
@Component({
  selector: 'app-system-config',
  templateUrl: './system-config.component.html',
  styleUrls: ['./system-config.component.css']
})
export class SystemConfigComponent implements OnInit {

  @ViewChild('addEditModal') private addEditModal: ModalDirective;
  public entity: any;
  public flagAdd = true;
  public systemConfigs: any[];
  constructor(private _dataService: DataService, private _notificationService: NotificationService,public _authenService:AuthenService) { }

  ngOnInit() {
    this.search()
  }
  public search() {
    this._dataService.get('/api/systemconfig/getall').subscribe((res: any) => {
      this.systemConfigs = res
    });
  }
  public showAdd() {
    this.entity = { Status: true };
    this.addEditModal.show();
    this.flagAdd = true;
  }

  public editSystemModal(id: string) {
    this._dataService.get('/api/systemconfig/detail/' + id).subscribe((res: any) => {
      this.entity = res;
      this.entity.Value4 = moment(this.entity.Value4).format("MM/DD/YYYY");
      this.flagAdd = false;
      this.addEditModal.show();
    });
  }

  private deleteConfirm(id: string) {
    this._dataService.delete('/api/systemconfig/delete', 'id', id).subscribe((res: any) => {
      this.search();
    });
  }
  public deleteSystem(id: string) {
    this._notificationService.printConfirmationDialog(MessageConstant.CONFIRM_DELETE_MEG, () => this.deleteConfirm(id))
  }

  public saveChanges(form: NgForm) {  
    if (form.valid) {
      this.entity.Value4 = moment(this.entity.Value4).format("MM/DD/YYYY");
      if (this.flagAdd == true) {
        this._dataService.post("/api/systemconfig/add", JSON.stringify(this.entity)).subscribe((res: any) => {
          this.search();
          this.addEditModal.hide();
          form.resetForm();
        })
      }
      else {
        this._dataService.put("/api/systemconfig/update", JSON.stringify(this.entity)).subscribe((res: any) => {
          this.search();
          this.addEditModal.hide();
          form.resetForm();
        })
      }
    }

  }

}
