import { Component, OnInit,ViewChild } from '@angular/core';
import {DataService} from '../../core/service/data.service';
import {NotificationService} from '../../core/service/notification.service';
import {MessageConstant} from '../../core/common/message.constant';
import {ModalDirective} from 'ngx-bootstrap';
import {AuthenService} from '../../core/service/authen.service';
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  public totalRow: number;
  public pageIndex: number = 1;
  public pageSize: number = 10;
  public pageDisplay: number = 10;
  public filterCustomerName: string = '';
  public filterStartDate: string = '';
  public filterbillStatus: string = '5';
  public filterEndDate: string = '';
  public orders: any[]=[];
  public entity:any={};
  public _billStats:any[]=
  [
    {Id:0,Name:"Mới"},
    {Id:1,Name:"Đang giao"},
    {Id:2,Name:"Trả về"},
    {Id:3,Name:"Hủy"},
    {Id:4,Name:"Thành công"},  
  ];

  @ViewChild('addEditModal') private addEditModal: ModalDirective;
    
  constructor(private _dataService:DataService,private _notificationService:NotificationService,public _authenService:AuthenService) { 
    
  }

  ngOnInit() {
    this.search();
  }

  pageChanged(event: any): void {
    this.pageIndex= event.page;
    this.search();
  }

  public searchIndex(){
    this.pageIndex=1;
    this.search();
  }

  public reset() {
    this.filterCustomerName = '';
    this.filterEndDate = '';
    this.filterStartDate = '';
    this.filterbillStatus = '5';
    this.search();
  }

  public search() {
    this._dataService.get('/api/order/getlistpaging?page=' + this.pageIndex
      + '&pageSize=' + this.pageSize + '&startDate=' + this.filterStartDate
      + '&endDate=' + this.filterEndDate + '&customerName=' + this.filterCustomerName
      + '&billStatus=' + this.filterbillStatus)
      .subscribe((response: any) => {
        this.orders = response.Items;
        this.pageIndex = response.PageIndex;
        this.totalRow=response.TotalRows;
      });
  }

  public delete(id: string) {
    this._notificationService.printConfirmationDialog(MessageConstant.CONFIRM_DELETE_MEG, () => {
      this._dataService.delete('/api/order/delete', 'id', id).subscribe((response: any) => {     
        this.search();
      });
    });
  }

 public updateBillStatus(id:string){
   this.loadDetailBill(id)
   this.addEditModal.show();
 }
 private loadDetailBill(id:string){
  this._dataService.get('/api/order/detail/' + id).subscribe((response: any) => {
    this.entity = response;   
  });
 }

 public saveChanges(){
   this._dataService.put('/api/order/update',this.entity).subscribe((res:any)=>{
     this.search();
     this.addEditModal.hide();
   })
 }

}
