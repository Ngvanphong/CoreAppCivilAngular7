import { Component, OnInit,ViewChild } from '@angular/core';
import { DataService } from '../../core/service/data.service'
import { ModalDirective } from 'ngx-bootstrap/modal';
import { NotificationService } from '../../core/service/notification.service';
import { MessageConstant } from '../../core/common/message.constant';
import {AuthenService} from '../../core/service/authen.service';
@Component({
  selector: 'app-size',
  templateUrl: './size.component.html',
  styleUrls: ['./size.component.css']
})
export class SizeComponent implements OnInit {

  @ViewChild('addEditModal') addEditModal: ModalDirective;
  public entity: any;
  public sizes: any;
  constructor(private _dataService: DataService, private _notificationService: NotificationService,public _authenService:AuthenService) { }

  ngOnInit() {
    this.load();
  }
  private load() {
    this._dataService.get('/api/productQuantity/getsizes').subscribe((res: any) => {
        this.sizes = res;
      })
  }
  showAdd() {
    this.addEditModal.show();
    this.entity = {};
  }

  editSizeModal(id:any){
    this.loadSize(id);
    this.addEditModal.show();
  }
  private loadSize(id:any){
    this._dataService.get('/api/productQuantity/sizesdetail/'+id)
      .subscribe((res:any)=>{
        this.entity=res;
      })
  }

  deleteSize(id: any) {
    this._notificationService.printConfirmationDialog(MessageConstant.CONFIRM_DELETE_MEG, () => this.deleteConfirm(id))
  }
  private deleteConfirm(id: any) {
    this._dataService.delete("/api/productQuantity/deletesize", "id", id).subscribe((res: any) => {    
      this.load();
    })
  }

  saveChanges(valid:boolean){
    if(valid){
      if (this.entity.Id==undefined){
        this._dataService.post("/api/productQuantity/addsizes",JSON.stringify(this.entity)).subscribe((res:any)=>{
          this.load();
          this.addEditModal.hide();        
        })
      }
      else{
          this._dataService.put("/api/productQuantity/updatesizes",JSON.stringify(this.entity)).subscribe((res:any)=>{
            this.load();
            this.addEditModal.hide();
  
          })
      }
    }
  }


}
