import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../../core/service/data.service';
import { NotificationService } from '../../core/service/notification.service';
import { NgForm } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap';
import { SystemConstant } from '../../core/common/system.constant';
import { UploadService } from '../../core/service/upload.service';
import {MessageConstant} from '../../core/common/message.constant';
import {AuthenService} from '../../core/service/authen.service';

@Component({
  selector: 'app-advertistment',
  templateUrl: './advertistment.component.html',
  styleUrls: ['./advertistment.component.css']
})
export class AdvertistmentComponent implements OnInit {

  @ViewChild('modalAddEdit') addEditModal: ModalDirective;
  @ViewChild('modalAddEditPage') addEditModalPage: ModalDirective;
  @ViewChild('modalAddEditPosition') addEditModalPosition: ModalDirective;
  @ViewChild('image') image;
  public pageIndex: number = 1;
  public pageSize: number = 10;
  public pageDisplay: number = 10;
  public filter: string = '';
  public totalRow: number;
  public entity: any;
  public entityPage:any;
  public entityPosition:any;
  public advertistments: any;
  public advertistmentPages: any;
  public advertistmentPositions: any;
  public baseFolder: string = SystemConstant.BASE_API;
 


  constructor(private _dataService: DataService, private _notifictionService: NotificationService,
    private _uploadService: UploadService,public _authenService:AuthenService) {}

  ngOnInit() {
    this.search();
    this.searchPage();
    this.searchPosition();

  }

  pageChanged(event: any): void {
    this.pageIndex = event.page;
    this.search();
  }

  public search() {
    this._dataService.get('/api/advertistment/getallpaging?page=' + this.pageIndex + '&pageSize=' + this.pageSize + '&filter=' + this.filter)
      .subscribe((res: any) => {
        this.advertistments = res.Items;
        this.pageIndex = res.PageIndex;
        this.pageSize = res.PageSize;
        this.totalRow = res.TotalRows;
      })
  }
  public searchIndex(){
    this.pageIndex=1;
    this.search();
  }

  public searchPage() {
    this._dataService.get('/api/advertistment/getpage')
      .subscribe((res: any) => {
        this.advertistmentPages = res
      })
  }

  public searchPosition() {
    this._dataService.get('/api/advertistment/getposition')
      .subscribe((res: any) => {
        this.advertistmentPositions = res
      })
  }


  showAdd() {  
    this.entity = { Status: true };
    this.addEditModal.show();
  }
  showAddPage() { 
    this.entityPage = { };    
    this.addEditModalPage.show();
  }
  showAddPosition() {  
    this.entityPosition = { };     
    this.addEditModalPosition.show();
  }

  public editAdvertistmentModal(id:string){
    this.loadDetail(id);
    this.addEditModal.show();
  }

  private loadDetail(id:string){
    this._dataService.get("/api/advertistment/detail/"+id).subscribe((res)=>{
      this.entity=res;
    })
  }


  saveChange(form: NgForm) {
    if (form.valid) {
      let fi = this.image.nativeElement;
      if (fi.files.length > 0) {
        this._uploadService.postWithFile("/api/upload/saveImage?type=advertistment", null, fi.files)
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

  saveChangePage(valid :boolean){
    if(valid){
      this._dataService.post("/api/advertistment/addpage",JSON.stringify(this.entityPage)).subscribe((res:any)=>{
        this.searchPage();
        this.addEditModalPage.hide();
      })
    }
  }

  saveChangePosition(valid :boolean){
    if(valid){
      this._dataService.post("/api/advertistment/addposition",JSON.stringify(this.entityPosition)).subscribe((res:any)=>{
        this.searchPosition();
        this.addEditModalPosition.hide();
      })
    }
  }

  private saveData(form: NgForm) {
    if (this.entity.Id == undefined) {
      this._dataService.post("/api/advertistment/add", JSON.stringify(this.entity)).subscribe((res: any) => {
        if (res != null) {
          this.search();
          this.addEditModal.hide();
          form.resetForm();
          this.image.nativeElement.value = '';
        }
      })
    }
    else {
      this._dataService.put("/api/advertistment/update", JSON.stringify(this.entity)).subscribe((res: any) => {
        if (res != null) {
          this.search();
          this.addEditModal.hide();
          form.resetForm();
          this.image.nativeElement.value = '';
        }
      })
    }
  }

  public deleteAdvertistmentPage(id:string){
    this._notifictionService.printConfirmationDialog(MessageConstant.CONFIRM_DELETE_MEG,()=>{
      this._dataService.delete("/api/advertistment/deletePage","id",id).subscribe((res)=>{
        this.searchPage();
      });
    })  
  }

  public deleteAdvertistmentPosition(id:string){
    this._notifictionService.printConfirmationDialog(MessageConstant.CONFIRM_DELETE_MEG,()=>{
      this._dataService.delete("/api/advertistment/deletePosition","id",id).subscribe((res)=>{
        this.searchPosition();
      });
    })  
  }

  public deleteAdvertistment(id:string){
    this._notifictionService.printConfirmationDialog(MessageConstant.CONFIRM_DELETE_MEG,()=>{
      this._dataService.delete("/api/advertistment/delete","id",id).subscribe((res)=>{
        this.search();
      });
    }) 
  }


}
