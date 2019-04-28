import { Component, OnInit,ViewChild } from '@angular/core';
import { DataService } from '../../core/service/data.service';
import { NotificationService } from '../../core/service/notification.service';
import { MessageConstant } from '../../core/common/message.constant';
import { UploadService } from '../../core/service/upload.service';
import { ModalDirective } from 'ngx-bootstrap';
import { SystemConstant } from '../../core/common/system.constant';
import { NgForm } from '@angular/forms';
import {AuthenService} from '../../core/service/authen.service';
@Component({
  selector: 'app-logopantner',
  templateUrl: './logopantner.component.html',
  styleUrls: ['./logopantner.component.css']
})
export class LogopantnerComponent implements OnInit {

  @ViewChild('addEditModal') private addEditModal: ModalDirective;
  @ViewChild('image2') image2;
  public entity: any = {};
  public pantners: any[] = [];
  public baseFolder: string = SystemConstant.BASE_API;
  constructor(private _dataService: DataService, private _notificationService: NotificationService,
    private _uploadService: UploadService,public _authenService:AuthenService) { }

  ngOnInit() {
    this.search();
  }
  public search() {
    this._dataService.get('/api/pantner/getall').subscribe((res: any) => {
     this.pantners=res;
    });
  }

  public showAdd() {
    this.entity = { Status: true };
    this.addEditModal.show();
  }

  public editPantnerModal(id: string) {
    this._dataService.get('/api/pantner/detail/' + id).subscribe((res: any) => {
      this.entity = res;
      this.addEditModal.show();
    });
  }

  private deleteConfirm(id: string) {
    this._dataService.delete('/api/pantner/delete', 'id', id).subscribe((res: any) => {
      this.search();
    });
  }
  public deletePantner(id: string) {
    this._notificationService.printConfirmationDialog(MessageConstant.CONFIRM_DELETE_MEG, () => this.deleteConfirm(id))
  }

  saveChanges(form: NgForm) {
    if (form.valid) {
      let fi = this.image2.nativeElement;
      if (fi.files.length > 0) {
        this._uploadService.postWithFile("/api/upload/saveImage?type=pantner", null, fi.files)
          .then((imageUrl: string) => {
            this.entity.Image = imageUrl;
          }).then(() => {
            this.saveData(form);
          });
      }
      else {
        this.saveData(form);
      }
    }
  }
  private saveData(form: NgForm) {
    if (this.entity.Id == undefined) {
      this._dataService.post("/api/pantner/add", JSON.stringify(this.entity)).subscribe((res: any) => {
        this.search();
        this.addEditModal.hide();
        this.image2.nativeElement.value = '';
        form.resetForm();
      })
    }
    else {
      this._dataService.put("/api/pantner/update", JSON.stringify(this.entity)).subscribe((res: any) => {
        this.search();
        this.addEditModal.hide();
        this.image2.nativeElement.value = '';
        form.resetForm();
      })
    }
  }

}
