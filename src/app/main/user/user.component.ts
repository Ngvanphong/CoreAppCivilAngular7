import { Component, OnInit,ViewChild } from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap';
import {SystemConstant} from '../../core/common/system.constant';
import {DataService} from '../../core/service/data.service';
import {NgForm} from '@angular/forms';
import {UploadService} from '../../core/service/upload.service';
import {NotificationService} from '../../core/service/notification.service';
import {MessageConstant} from '../../core/common/message.constant';
import {AuthenService} from '../../core/service/authen.service';

declare var  moment:any;
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  @ViewChild('modalAddEdit') addEditModal: ModalDirective;
  @ViewChild('avatar') avatar;
  public pageIndex: number = 1;
  public pageSize: number = 10;
  public pageDisplay: number = 10;
  public filter: string = '';
  public totalRow: number;
  public entity: any;
  public users: any;
  public roles:any[];
  public baseFolder:string=SystemConstant.BASE_API;
  public isConfirm:boolean=true;

  //dropdown multi
  public dropdownList = [];
  public selectedItems = [];
  public dropdownSettings = {};

  constructor(private _dataService:DataService, private _uploadService:UploadService, private _notificationService:NotificationService
    ,public _authenService:AuthenService) { }

  ngOnInit() {   
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 5,
      allowSearchFilter: true
    };
    this.search();
    this.loadRole();
  }

  public search() {
    this._dataService.get('/api/appUser/getlistpaging?page=' + this.pageIndex + '&pageSize=' + this.pageSize + '&filter=' + this.filter)
      .subscribe((res: any) => {
        this.users = res.Items;
        this.pageIndex = res.PageIndex;
        this.pageSize = res.PageSize;
        this.totalRow = res.TotalRows;
      })
  }
  public searchIndex(){
    this.pageIndex=1;
    this.search();
  }

  pageChanged(event: any): void {
    this.pageIndex= event.page;
    this.search();
  }

  private loadRole(){
    this._dataService.get("/api/appRole/getlistall").subscribe(data=>{
      this.roles=data;
      this.dropdownList=[];
      for(let role of this.roles){      
        this.dropdownList.push({item_id:role.Name,item_text:role.Name});
      }
    })
  }

  showAdd() {
    this.isConfirm=true;
    this.selectedItems=[];
    this.addEditModal.show();
    this.entity = {Status:true};
  }

  editUserModal(id: any) {
    this.isConfirm=true;
    this.loadUser(id);
    this.addEditModal.show();
  };

  private loadUser(id: any) {
    this.entity={};
    this._dataService.get('/api/appUser/detail/' + id)
      .subscribe((res: any) => {
        this.entity = res;
        this.selectedItems=[];
        this.entity.BirthDay=moment(this.entity.BirthDay).format('MM/DD/YYYY');
        for(let role of this.entity.Roles){
          this.selectedItems.push(role);
        }; 
      })
  }

  deleteUser(id: any) {
    this._notificationService.printConfirmationDialog(MessageConstant.CONFIRM_DELETE_MEG, () => this.deleteConfirm(id))
  }

  private deleteConfirm(id: any) {
    this._dataService.delete("/api/appUser/delete", "id", id).subscribe((res: Response) => {   
      this.search();
    })
  }

  saveChange(form:NgForm) {
    if (form.valid) {
      this.entity.Roles=this.selectedItems;  
      let fi=this.avatar.nativeElement;
      if(fi.files.length>0){
        this._uploadService.postWithFile("/api/upload/saveImage?type=avatar", null, fi.files)
        .then((imageUrl:string)=>{
            this.entity.Avatar=imageUrl;
        }).then(()=>{
          this.saveData(form);
        });
      }
      else{
        this.saveData(form);
      }
    }
  }

  private saveData(form:NgForm){
    this.entity.BirthDay=moment(this.entity.BirthDay).format('MM/DD/YYYY');
    if (this.entity.Id == undefined) {
      this._dataService.post("/api/appUser/add", JSON.stringify(this.entity)).subscribe((res: any) => {
        if(res!=null){
          this.search();
          this.addEditModal.hide();
          form.resetForm();
          this.avatar.nativeElement.value=''; 
        }          
       } )
    }
    else {
      this._dataService.put("/api/appUser/update", JSON.stringify(this.entity)).subscribe((res: any) => {
        if(res!=null){
          this.search();
          this.addEditModal.hide();
          form.resetForm();
          this.avatar.nativeElement.value='';
        }   
      })
    }
  }

  public ConfirmPass() {
    if (this.entity.Password == this.entity.ConfirmPassword) {
      this.isConfirm = true;
    }
    else {
      this.isConfirm = false;
    }
  }

}
