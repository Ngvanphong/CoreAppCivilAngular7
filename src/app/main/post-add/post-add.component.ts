import { Component, OnInit, ViewChild } from '@angular/core';
import { SystemConstant } from '../../core/common/system.constant';
import { DataService } from '../../core/service/data.service';
import { ActivatedRoute, Router } from '@angular/router'
import { Observable } from 'rxjs';
import { NotificationService } from '../../core/service/notification.service';
import { ModalDirective } from 'ngx-bootstrap';
import { UploadService } from '../../core/service/upload.service';
import { MessageConstant } from '../../core/common/message.constant';
import { NgForm } from '@angular/forms'

declare const tinymce: any;
@Component({
  selector: 'app-post-add',
  templateUrl: './post-add.component.html',
  styleUrls: ['./post-add.component.css']
})
export class PostAddComponent implements OnInit {
  public baseFolder: string = SystemConstant.BASE_API;
  @ViewChild('imageManageModal') private imageManageModal: ModalDirective;
  @ViewChild('imageinput') private imageinput;
  public entity: any = { Content: '' };
  public posts: any[];
  public postCategories: any[]
  public blogId: Observable<string>

  @ViewChild('imagePath') private imagePath;
  public imageEntity: any = {};
  public postImages: any[];
  public image: any = {};
  public parama: any;

  constructor(private _dataService: DataService, private _activateRouter: ActivatedRoute, private _router: Router,
    private _notificationService: NotificationService, private _uploadService: UploadService) {
    this._activateRouter.params.subscribe(params => {
      this.blogId = params['id'];
      this.imageEntity.BlogId=this.blogId;
    });
  }

  ngOnInit() {
    this.getDetail()
  }
  private getDetail() {
    this._dataService.get('/api/post/detail/' + this.blogId).subscribe((response: any) => {
      this.entity = response;
      if (this.entity.Content != undefined && this.entity.Content != null) {
        tinymce.activeEditor.setContent(this.entity.Content);
      }
      else {
        tinymce.on('init', () => {
          tinymce.editor = ""
          
        });
      }
    });

  }

  public keyupHandlerContentFunction(e: any) {
    this.entity.Content = e;
  }

  goBack() {
    this._notificationService.printConfirmationDialog("Bạn đã lưu nội dung trước khi quay lại !", () => {
      this._router.navigate(['/main/post/index']);
    })
  }

  public updateContent() {
    this._dataService.put("/api/post/update", JSON.stringify(this.entity)).subscribe((res: any) => {
    })
  }

  public showImageManage() {
    this.imageEntity.BlogId=this.blogId;
    this.loadPostImage(this.imageEntity.BlogId);
    this.imageManageModal.show();
  }

  private loadPostImage(id: number) { 
    this._dataService.get('/api/postimage/getall?blogId=' + id).subscribe((res) => {
      this.postImages = res;
    });
  }

  public closePopupImage() {
    this.imageManageModal.hide();
  }

  public deleteImage(imageId: string) {
    this._notificationService.printConfirmationDialog(MessageConstant.CONFIRM_DELETE_MEG, () => {
      this._dataService.delete('/api/postImage/delete', 'id', imageId.toString()).subscribe((res) => {
        this.imageEntity.BlogId=this.blogId;
        this.loadPostImage(this.imageEntity.BlogId);
      });
    })
  }

  public savePostImage(form: NgForm) {
    if (form.valid) {
      var fi = this.imagePath.nativeElement;
      if (fi.files.length > 0) {
        this._uploadService.postWithFile('/api/upload/saveimage?type=post', null, fi.files).then((imageUrl) => {
          this.imageEntity.Path = imageUrl;
        }).then(() => {
          this.changeData(form);
        })
      }
    }
  }

  private changeData(form: NgForm) {
    this.imageEntity.BlogId=this.blogId;
    this._dataService.post('/api/postimage/add', JSON.stringify(this.imageEntity)).subscribe((res) => {
      this.imagePath.nativeElement.value = '';
      this.imageEntity.Caption = '';
      this.loadPostImage(this.imageEntity.BlogId);
      form.resetForm();
    })
  }



}
