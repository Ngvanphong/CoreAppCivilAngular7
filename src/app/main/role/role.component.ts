import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { DataService } from '../../core/service/data.service';
import {NotificationService} from '../../core/service/notification.service';
import {MessageConstant} from '../../core/common/message.constant';
import {NgForm} from '@angular/forms';
import {AuthenService} from '../../core/service/authen.service';
@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit {

  @ViewChild('addEditModal') addEditModal: ModalDirective;
  public pageIndex: number = 1;
  public pageSize: number = 10;
  public pageDisplay: number = 10;
  public filter: string = '';
  public totalRow: number;
  public entity: any;
  public roles: any;

  constructor(private _dataService: DataService, private _notificationService:NotificationService,public _authenService:AuthenService) { }

  ngOnInit() {
    this.search();
  }

  public search() {
    this._dataService.get('/api/appRole/getlistpaging?page=' + this.pageIndex + '&pageSize=' + this.pageSize + '&filter=' + this.filter)
      .subscribe((res: any) => {
        this.roles = res.Items;
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
    this.pageIndex = event.page;
    this.search();
  }

  showAdd(){
    this.addEditModal.show();
    this.entity={};
  }

  private loadRole(id:any){
    this._dataService.get('/api/appRole/detail/'+id)
      .subscribe((res:any)=>{
        this.entity=res;
      })
  }

  editRoleModal(id:any){
    this.loadRole(id);
    this.addEditModal.show();
  };

  deleteRole(id:any){
    this._notificationService.printConfirmationDialog(MessageConstant.CONFIRM_DELETE_MEG,()=>this.deleteConfirm(id))
  }

  private deleteConfirm(id:any){
         this._dataService.delete("/api/appRole/delete","id",id).subscribe((res:Response)=>{    
        this.search();     
      })
  }

  saveChanged(form:NgForm){
    if(form.valid){
      if (this.entity.Id==undefined){
        this._dataService.post("/api/appRole/add",JSON.stringify(this.entity)).subscribe((res:any)=>{
          if(res!=undefined){
            this.search();
            this.addEditModal.hide(); 
            form.resetForm();         
          }       
        })
      }
      else{
          this._dataService.put("/api/appRole/update",JSON.stringify(this.entity)).subscribe((res:any)=>{
            if(res!=undefined){
              this.search();
              this.addEditModal.hide();
              form.resetForm();      
            }              
          })
      }
    }
  }

}
