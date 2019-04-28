import { Component, OnInit, ViewChild } from '@angular/core';
import { UtilityService } from '../../core/service/utility.service';
import { DataService } from '../../core/service/data.service';
import { SystemConstant } from '../../core/common/system.constant';
import { ModalDirective } from 'ngx-bootstrap';
import { NotificationService } from '../../core/service/notification.service';
import { MessageConstant } from '../../core/common/message.constant';
import { NgForm } from '@angular/forms';
import { UploadService } from '../../core/service/upload.service';
import {AuthenService} from '../../core/service/authen.service';
declare const tinymce: any;

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  @ViewChild('addEditModal') private addEditModal: ModalDirective;
  public baseFolder: string = SystemConstant.BASE_API;
  public entity: any;
  public totalRow: number;
  public pageIndex: number = 1;
  public pageSize: number = 10;
  public pageDisplay: number = 7;
  public filterKeyword: string = '';
  public filterCategoryId: string = '';
  public filterHotPromotion: string = "";
  public products: any[];
  public productCategories: any[]
  public checkedItems: any[] = [];
  private flagInitTiny: boolean = true;
  /*Image Management*/
  @ViewChild('imageManageModal') private imageManageModal: ModalDirective;
  @ViewChild('imagePath') private imagePath;
  public imageEntity: any = {};
  public productImages: any[];
  public image: any = {};
  /*ImageContent Management */
  @ViewChild('imageManageModalContent') private imageManageModalContent: ModalDirective;
  @ViewChild('imagePathContent') private imagePathContent;
  public imageEntityContent: any = {};
  public productImagesContent: any[];
  public imageContent: any = {};
  public pantners:any=[];


  constructor(private _utilityService: UtilityService, private _dataService: DataService,
    private _notificationService: NotificationService, private _uploadService: UploadService,public _authenService:AuthenService) { }

  ngOnInit() {
    this.search();
    this.loadPantner();
    this.loadProductCategories();
    
  }

  pageChanged(event: any): void {
    this.pageIndex = event.page;
    this.search();
  }
  public search() {
    this._dataService.get('/api/product/getall?page=' + this.pageIndex + '&pageSize=' + this.pageSize + '&keyword=' + this.filterKeyword + '&categoryId='
      + this.filterCategoryId + '&filterHotPromotion=' + this.filterHotPromotion)
      .subscribe((response: any) => {
        if (response != null) {
          this.products = response.Items;
          this.pageIndex = response.PageIndex;
          this.totalRow = response.TotalRows;
        }
      }
      );
  }
  

  public searchIndex(){
    this.pageIndex=1;
    this.search();
  }

  public reset() {
    this.filterKeyword = '';
    this.filterHotPromotion = '';
    this.filterCategoryId = '';
    this.search();
  }

  private loadProductCategories() {
    this._dataService.get('/api/ProductCategory/getallhierachy').subscribe((response: any[]) => {
      this.productCategories = response;
    });
  }
  private loadPantner(){
    this._dataService.get('/api/Pantner/getall').subscribe((response: any[]) => {
      this.pantners = response;
    });
  }

  private deleteConfirm(id: string) {
    this._dataService.delete('/api/product/delete', 'id', id).subscribe((response: any) => {
      this.search();
    });
  }

  public delete(id: string) {
    this._notificationService.printConfirmationDialog(MessageConstant.CONFIRM_DELETE_MEG, () => this.deleteConfirm(id));
  }

  public deleteMulti() {
    this.checkedItems = this.products.filter(x => x.Checked == true);
    let checkedIds: any[] = [];
    for (var i = 0; i < this.checkedItems.length; ++i) {
      checkedIds.push(this.checkedItems[i]["Id"]);
    };
    this._notificationService.printConfirmationDialog(MessageConstant.CONFIRM_DELETE_MEG, () => {
      this._dataService.delete('/api/product/deletemulti', 'checkedProducts', JSON.stringify(checkedIds)).subscribe((res) => {
        this.search();
      });
    });
  }

  public showAdd() {
    
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

  confirmHideaddEditModal(){
    this._notificationService.printConfirmationDialog("Bạn có chắc muốn thoát ?",()=>{
      this.addEditModal.hide();
    })
  }

  public keyupHandlerContentFunction(e: any) {
    this.entity.Content = e;
  }

  public createAlias(name: any) {
    this.entity.SeoAlias = this._utilityService.MakeSeoTitle(name);
  }

  public showEdit(id: string) {
    
    this._dataService.get('/api/product/detail/' + id).subscribe((response: any) => {
      this.entity = response;
      if (this.flagInitTiny) {
        tinymce.on('init', () => {
        });
        this.flagInitTiny = false;
      }
      else {
        tinymce.activeEditor.setContent(this.entity.Content)
      }
      this.addEditModal.show();
    });
  }

  public saveChanges(form: NgForm) {
    if (form.valid == true) {
      if (this.entity.Id == undefined) {
        this._dataService.post('/api/product/add', JSON.stringify(this.entity)).subscribe((res: any) => {
          if (res != null) {
            this.search();
            this.addEditModal.hide();
            form.resetForm();
          }
        });
      }
      else {
        this._dataService.put('/api/product/update', JSON.stringify(this.entity)).subscribe((response: any) => {
          if (response != null) {
            this.search();
            this.addEditModal.hide();
            form.resetForm();
          }
        });
      }
    }
  }

  /*Imange Management*/
  public showImageManage(id: any) {
    this.imageEntity = {
      ProductId: id,
    };
    this.loadProductImage(id);
    this.imageManageModal.show();

  };
  private loadProductImage(id: any) {
    this._dataService.get('/api/productImage/getall?productId=' + id).subscribe((res) => {
      this.productImages = res;
    });
  }

  public saveProductImage(forms: NgForm) {
    if (forms.valid == true) {
      var fi = this.imagePath.nativeElement;
      if (fi.files.length > 0) {
        this._uploadService.postWithFile('/api/upload/saveImage?type=product', null, fi.files).then((imageUrl) => {
          this.imageEntity.Path = imageUrl;
        }).then(() => {
          this._dataService.post('/api/productImage/add', JSON.stringify(this.imageEntity)).subscribe((res) => {
            this.imagePath.nativeElement.value = '';
            this.loadProductImage(this.imageEntity.ProductId);
            this.imageEntity.Caption = '';
          })
        })
      }
    }
  }

  public deleteImage(imageId: string) {
    this._notificationService.printConfirmationDialog(MessageConstant.CONFIRM_DELETE_MEG, () => {
      this._dataService.delete('/api/productImage/delete', 'id', imageId.toString()).subscribe((res) => {
        this.loadProductImage(this.imageEntity.ProductId);
      });
    })
  }
  private thumbnailImage() {
    this._dataService.put('/api/product/thumnailImage?productId=' + this.imageEntity.ProductId).subscribe((res) => {
      this.search();
    });
  }
  public closePopupImage() {
    this.thumbnailImage();
    this.imageManageModal.hide();
  }

  public updateImage(imageId: any, caption: any) {
    for (let item of this.productImages) {
      if (item.Id == imageId) {
        this.image = item;
        this.image.Caption = caption;
      }
    }
    this._dataService.put('/api/productImage/update', JSON.stringify(this.image)).subscribe((res) => {
    });
  }

  /*ImageContent Management */
  public showImageManageContent(id: any) {
    this.imageEntityContent = {
      ProductId: id,
    };
    this.loadProductImageContent(id);
    this.imageManageModalContent.show();

  };
  private loadProductImageContent(id: any) {
    this._dataService.get('/api/productImage/getallImageContent?productId=' + id).subscribe((res) => {
      this.productImagesContent = res;
    });
  }

  public closePopupImageContent() {
    this.imageManageModalContent.hide();
  }

  public saveProductImageContent(forms: NgForm) {
    if (forms.valid == true) {
      var fi = this.imagePathContent.nativeElement;
      if (fi.files.length > 0) {
        this._uploadService.postWithFile('/api/upload/saveImage?type=product', null, fi.files).then((imageUrl) => {
          this.imageEntityContent.Path = imageUrl;
          this.imageEntityContent.SwitchImage = true;
        }).then(() => {
          this._dataService.post('/api/productImage/add', JSON.stringify(this.imageEntityContent)).subscribe((res) => {
            this.imagePathContent.nativeElement.value = '';
            this.loadProductImageContent(this.imageEntityContent.ProductId);
            this.imageEntityContent.Caption = '';
          })
        })
      }
    }
  }


  public updateImageContent(imageId: any, switchImage: any) {
    for (let item of this.productImagesContent) {
      if (item.Id == imageId) {
        this.imageContent = item;      
        this.imageContent.SwitchImage = switchImage
      }
    }
    this._dataService.put('/api/productImage/update', JSON.stringify(this.imageContent)).subscribe((res) => {
    });
  }

  public deleteImageContent(imageId: string) {
    this._notificationService.printConfirmationDialog(MessageConstant.CONFIRM_DELETE_MEG, () => {
      this._dataService.delete('/api/productImage/delete', 'id', imageId.toString()).subscribe((res) => {
        this.loadProductImageContent(this.imageEntityContent.ProductId);
      });
    })
  }

 

}
