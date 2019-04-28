import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { SystemConstant } from '../../core/common/system.constant';
import { DataService } from '../../core/service/data.service';
import { NotificationService } from '../../core/service/notification.service';
import { MessageConstant } from '../../core/common/message.constant';
import { UploadService } from '../../core/service/upload.service';
import { NgForm } from '@angular/forms';
import {AuthenService} from '../../core/service/authen.service';
@Component({
  selector: 'app-slide',
  templateUrl: './slide.component.html',
  styleUrls: ['./slide.component.css']
})
export class SlideComponent implements OnInit {
  @ViewChild('addEditModal') private addEditModal: ModalDirective;
  @ViewChild('image2') image2;
  public entity: any = {};
  public slides: any[] = [];
  public baseFolder: string = SystemConstant.BASE_API;

  public totalRow: number;
  public pageIndex: number = 1;
  public pageSize: number = 10;
  public pageDisplay: number = 7;
  public filter: any = '';

  constructor(private _dataService: DataService, private _notificationService: NotificationService,
    private _uploadService: UploadService,public _authenService:AuthenService) { }

  ngOnInit() {
    this.search();
  }

  pageChanged(event: any): void {
    this.pageIndex = event.page;
    this.search();
  }

  public search() {
    this._dataService.get('/api/slide/getallPagging?page=' + this.pageIndex + '&pageSize=' + this.pageSize + '&filter=' + this.filter).subscribe((res: any) => {
      this.slides = res.Items;
      this.pageIndex = res.PageIndex;
      this.totalRow = res.TotalRows;
    });
  }
  public searchIndex(){
    this.pageIndex=1;
    this.search();
  }

  public showAdd() {
    this.entity = { Status: true };
    this.addEditModal.show();
  }

  public editSlideModal(id: string) {
    this._dataService.get('/api/slide/detail/' + id).subscribe((res: any) => {
      this.entity = res;
      this.addEditModal.show();
    });
  }

  private deleteConfirm(id: string) {
    this._dataService.delete('/api/slide/delete', 'id', id).subscribe((res: any) => {
      this.search();
    });
  }
  public deleteSlide(id: string) {
    this._notificationService.printConfirmationDialog(MessageConstant.CONFIRM_DELETE_MEG, () => this.deleteConfirm(id))
  }

  saveChanges(form: NgForm) {
    if (form.valid) {
      let fi = this.image2.nativeElement;
      if (fi.files.length > 0) {
        this._uploadService.postWithFile("/api/upload/saveImage?type=banner", null, fi.files)
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
      this._dataService.post("/api/slide/add", JSON.stringify(this.entity)).subscribe((res: any) => {
        this.search();
        this.addEditModal.hide();
        this.image2.nativeElement.value = '';
        form.resetForm();
      })
    }
    else {
      this._dataService.put("/api/slide/update", JSON.stringify(this.entity)).subscribe((res: any) => {
        this.search();
        this.addEditModal.hide();
        this.image2.nativeElement.value = '';
        form.resetForm();
      })
    }
  }



}
