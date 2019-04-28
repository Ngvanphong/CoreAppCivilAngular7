import { Component, OnInit,ViewChild } from '@angular/core';
import { DataService } from '../../core/service/data.service'
import { ModalDirective } from 'ngx-bootstrap/modal';
import { NotificationService } from '../../core/service/notification.service';
import { MessageConstant } from '../../core/common/message.constant';
import {AuthenService} from '../../core/service/authen.service';
@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.css']
})
export class ColorComponent implements OnInit {

  @ViewChild('addEditModal') addEditModal: ModalDirective;
  public entity: any;
  public colors: any;
  constructor(private _dataService: DataService, private _notificationService: NotificationService,public _authenService:AuthenService) { }

  ngOnInit() {
    this.load();
  }
  private load() {
    this._dataService.get('/api/productQuantity/getcolors').subscribe((res: any) => {
        this.colors = res;
      })
  }
  showAdd() {
    this.addEditModal.show();
    this.entity = {};
  }

  editColorModal(id:any){
    this.loadColor(id);
    this.addEditModal.show();
  }
  private loadColor(id:any){
    this._dataService.get('/api/productQuantity/colorsdetail/'+id)
      .subscribe((res:any)=>{
        this.entity=res;
      })
  }

  deleteColor(id: any) {
    this._notificationService.printConfirmationDialog(MessageConstant.CONFIRM_DELETE_MEG, () => this.deleteConfirm(id))
  }
  private deleteConfirm(id: any) {
    this._dataService.delete("/api/productQuantity/deletecolor", "id", id).subscribe((res: any) => {    
      this.load();
    })
  }

  saveChanges(valid:boolean){
    if(valid){
      if (this.entity.Id==undefined){
        this._dataService.post("/api/productQuantity/addcolors",JSON.stringify(this.entity)).subscribe((res:any)=>{
          this.load();
          this.addEditModal.hide();        
        })
      }
      else{
          this._dataService.put("/api/productQuantity/updatecolors",JSON.stringify(this.entity)).subscribe((res:any)=>{
            this.load();
            this.addEditModal.hide();
  
          })
      }
    }
  }


}
