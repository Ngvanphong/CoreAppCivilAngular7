import { Component, OnInit,ViewChild } from '@angular/core';
import { DataService } from '../../core/service/data.service';
import { NotificationService } from '../../core/service/notification.service';
import { ModalDirective } from 'ngx-bootstrap';
import { MessageConstant } from '../../core/common/message.constant';
import {AuthenService} from '../../core/service/authen.service';
@Component({
  selector: 'app-send-email',
  templateUrl: './send-email.component.html',
  styleUrls: ['./send-email.component.css']
})
export class SendEmailComponent implements OnInit {
  public pageIndex: number = 1;
  public pageSize: number = 10;
  public pageDisplay: number = 10;
  public totalRow: number;
  public subcribles: any[];
  public entity: any = {Message: '' };
  public disableSuccess:boolean;
  @ViewChild('addEditModal') private addEditModal: ModalDirective;

  constructor(private _dataService: DataService, private _notificationService: NotificationService,public _authenService:AuthenService) { }
  ngOnInit() {
    this.search();
  }
  private search() {
    this._dataService.get('/api/sendmail/getall?page=' + this.pageIndex + '&pageSize=' + this.pageSize).subscribe((res) => {
      if (res != undefined) {
        this.subcribles = res.Items;
        this.pageIndex = res.PageIndex;
        this.pageSize = res.PageSize;
        this.totalRow = res.TotalRows;
      }
    })
  }

  pageChanged(event: any): void {
    this.pageIndex = event.page;
    this.search();
  }

  
  public showAdd() {
    this.disableSuccess=false;
    this.entity.ListEmail=[];   
    this.addEditModal.show();
  }


  public keyupHandlerContentFunction(e: any) {
    this.entity.Message = e;
  }


 public delete(id:string){
  this._notificationService.printConfirmationDialog(MessageConstant.CONFIRM_DELETE_MEG, () => this.deleteConfirm(id));
 }

 private deleteConfirm(id: string) {
  this._dataService.delete('/api/sendmail/delete', 'id', id).subscribe((response: any) => {
    this.search();
  });
}

public confirmHideaddEditModal(){
  this._notificationService.printConfirmationDialog("Bạn có chắc muốn thoát ?",()=>{
    this.addEditModal.hide();
  })
}

public saveChanges(valid:boolean){
  if(valid){
    this.disableSuccess=true;
    this._dataService.post('/api/sendmail/subcrible', this.entity).subscribe((response: any) => { 
      if(response!=undefined){
        this.addEditModal.hide();       
      }
    });
  }

}

  


}
