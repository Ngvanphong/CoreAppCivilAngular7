import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../../core/service/data.service';
import { NotificationService } from '../../core/service/notification.service';
import { NgForm } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap';
import { UploadService } from '../../core/service/upload.service';
import { MessageConstant } from '../../core/common/message.constant';
import { SystemConstant } from '../../core/common/system.constant';
import { UtilityService } from '../../core/service/utility.service';
import {AuthenService} from '../../core/service/authen.service';
declare const tinymce: any;

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit {
  private flagInitTiny: boolean = true;
  public pages: any[];
  public entity: any = { Content: '' };
  public baseFolder: string = SystemConstant.BASE_API;
  @ViewChild('addEditModal') private addEditModal: ModalDirective;

  @ViewChild('imageManageModalContent') private imageManageModalContent: ModalDirective;
  @ViewChild('imagePathContent') private imagePathContent: any;
  public imageEntityContent: any = {};
  public pageImagesContent: any[];
  constructor(private _dataService: DataService, private _uploadService: UploadService,
    private _notificationService: NotificationService, private _utilityService: UtilityService,public _authenService:AuthenService) { }
  ngOnInit() {
    this.search();

  }

  private search() {
    this._dataService.get("/api/page/getall").subscribe((res) => {
      if (res != undefined) this.pages = res;
    })
  }

  public createAlias(name: string) {
    this.entity.Alias = this._utilityService.MakeSeoTitle(name);
  }

  public showAddPage() {
    this.entity = { Content: '', Status: true };
    if (this.flagInitTiny) {
      tinymce.on('init', () => {
      });
      this.flagInitTiny = false;
    }
    else {
      tinymce.activeEditor.setContent('');
    }
    this.addEditModal.show();
  }

  public showEdit(id: string) {
    this.loadDetail(id);
    this.addEditModal.show();
  }
  private loadDetail(id: string) {
    this._dataService.get("/api/page/detail/" + id).subscribe(res => {
      this.entity = res;
      if (this.entity.Content != undefined && this.entity.Content != null) {
        tinymce.activeEditor.setContent(this.entity.Content);
      }
      else {
        tinymce.on('init', () => {
          tinymce.editor = ""
        });
      }
    })
  }

  public keyupHandlerContentFunction(e: any) {
    this.entity.Content = e;
  }


  public showImageManageContent(id: string) {
    this.imageEntityContent.PageId = id;
    this.loadPostImage(id);
    this.imageManageModalContent.show();
  }

  public savePageImageContent(form: NgForm) {
    if (form.valid) {
      var fi = this.imagePathContent.nativeElement;
      if (fi.files.length > 0) {
        this._uploadService.postWithFile('/api/upload/saveimage?type=page', null, fi.files).then((imageUrl) => {
          this.imageEntityContent.Path = imageUrl;
        }).then(() => {
          this.changeData(form);
        })
      }
    }
  }

  private changeData(form: NgForm) {
    this.imageEntityContent.PageId = this.entity.Id;
    this._dataService.post('/api/pageimage/add', JSON.stringify(this.imageEntityContent)).subscribe((res) => {
      this.imagePathContent.nativeElement.value = '';
      this.imagePathContent.Caption = '';
      this.loadPostImage(this.imageEntityContent.PageId);
      form.resetForm();
    })
  }

  private loadPostImage(id: string) {
    this._dataService.get('/api/pageimage/getall?pageId=' + id).subscribe((res) => {
      this.pageImagesContent = res;
    });
  }

  public deleteImageContent(imageId: string) {
    this._notificationService.printConfirmationDialog(MessageConstant.CONFIRM_DELETE_MEG, () => {
      this._dataService.delete('/api/pageImage/delete', 'id', imageId.toString()).subscribe((res) => {
        this.imageEntityContent.PageId=this.entity.Id;
        this.loadPostImage(this.imageEntityContent.PageId);
      });
    })
  }

 public delete(id:string){
  this._notificationService.printConfirmationDialog(MessageConstant.CONFIRM_DELETE_MEG, () => this.deleteConfirm(id));
 }

 private deleteConfirm(id: string) {
  this._dataService.delete('/api/page/delete', 'id', id).subscribe((response: any) => {
    this.search();
  });
}

public confirmHideaddEditModal(){
  this._notificationService.printConfirmationDialog("Bạn có chắc muốn thoát ?",()=>{
    this.addEditModal.hide();
  })
}

  public saveChanges(form: NgForm) {
    if (form.valid) {
      if (this.entity.Id != undefined) {
        this._dataService.put("/api/page/update", JSON.stringify(this.entity)).subscribe(res => {
          if (res != undefined) {           
            this.search();          
          }
        })
      }
      else {
        this._dataService.post("/api/page/add", JSON.stringify(this.entity)).subscribe(res => {
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
