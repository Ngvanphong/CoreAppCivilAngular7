import { Component, OnInit, ViewChild } from '@angular/core';
import { TreeComponent } from 'angular-tree-component';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { DataService } from '../../core/service/data.service';
import { UtilityService } from '../../core/service/utility.service';
import { NotificationService } from '../../core/service/notification.service';
import { MessageConstant } from '../../core/common/message.constant';
import { NgForm } from '@angular/forms';
import { UploadService } from '../../core/service/upload.service';
import {SystemConstant} from '../../core/common/system.constant';
import {AuthenService} from '../../core/service/authen.service';
@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.css']
})
export class ProductCategoryComponent implements OnInit {

  @ViewChild(TreeComponent) private treeProductCategory: TreeComponent;
  @ViewChild('addEditModal') private addEditModal: ModalDirective;
  @ViewChild('image') private image;

  public baseFolder: string = SystemConstant.BASE_API;
  public filter: string = '';
  public functionId: string;
  public entity: any;
  public _productCategoryHierachy: any[];
  public _productCategories: any[];
  private arryProductCategory:any[]=[];
  constructor(private _dataService: DataService, private _utilityService: UtilityService,
    private _notificationService: NotificationService, private _uploadService: UploadService,public _authenService:AuthenService) { }

  ngOnInit() {
    this.search();
  }
  // loadData
  public search() {
    this._dataService.get('/api/productCategory/getall?filter=' + this.filter).subscribe((res: any[]) => {
      this._productCategoryHierachy = this._utilityService.Unflatten(res);
      this._productCategories = res;
      this.arryProductCategory=res;
    });
  }

  // show add
  public showAdd() {
    this.entity = { Status: true, HomeFlag: true };
    this._productCategories=this.arryProductCategory;
    this.addEditModal.show();

  }

  public createAlias(name: any) {
    this.entity.SeoAlias = this._utilityService.MakeSeoTitle(name);
  }

  // show Edit Form
  public showEdit(id: string) {
    this._dataService.get('/api/productCategory/detail/' + id).subscribe((res: any) => {
      this.entity = res;
      this._productCategories=this.arrayRemove(this.arryProductCategory,this.entity.Id);
      this.addEditModal.show();
    });
  }

  private arrayRemove(arr, value) {
    return arr.filter(function(ele){
        return ele.Id != value;
    });
 }

  //Delete Confirm
  private deleteConfirm(id: string) {
    this._dataService.delete('/api/productCategory/delete', 'id', id).subscribe((res: any) => {
      this.search();
    });
  }

  //action delete
  public delete(id: string) {
    this._notificationService.printConfirmationDialog(MessageConstant.CONFIRM_DELETE_MEG, () => this.deleteConfirm(id))
  }

  public saveChanges(forms: NgForm) {
    if (forms.valid) {    
        this.saveChangesData(forms);    
    }
  }

  //Save change for modal
  private saveChangesData(forms: NgForm) {
    if (this.entity.Id === undefined) {
      this._dataService.post('/api/productCategory/add', this.entity).subscribe((res: any) => {
        if (res != null) {
          this.search();
          this.addEditModal.hide();
          forms.resetForm();
          this.image.nativeElement.value='';
        }
      });
    }
    else {
      this._dataService.put('/api/productCategory/update', this.entity).subscribe((res: any) => {
        if (res != null) {
          this.search();
          this.addEditModal.hide();
          forms.resetForm();
          this.image.nativeElement.value='';
        }
      });
    }

  }

}
