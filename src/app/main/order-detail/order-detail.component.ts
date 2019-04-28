import { Component, OnInit } from '@angular/core';
import {DataService} from '../../core/service/data.service';
import {SystemConstant} from '../../core/common/system.constant';
import {ActivatedRoute, Params } from '@angular/router';
import {UtilityService} from '../../core/service/utility.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {
  public orderDetails: any[];
  public entity: any;
  public orderId:any;
  public baseFolder:string=SystemConstant.BASE_API;

  constructor(private _dataService:DataService, private _activatedRoute:ActivatedRoute,
    private _utilityService:UtilityService) { }
  ngOnInit() {
    this._activatedRoute.params.subscribe((params: Params) => {
      this.orderId=params['id'];
      this.loadOrder(params['id']);
      this.loadOrderDetail(params['id']);
    });
  }

  public loadOrder(id: number) {
    this._dataService.get('/api/order/detail/' + id.toString()).subscribe((response: any) => {
      this.entity = response;
    });
  }

  public loadOrderDetail(id: number) {
    this._dataService.get('/api/order/getalldetails/' + id.toString()).subscribe((response: any[]) => {
      this.orderDetails = response;     
    });
  }

  public goBack() {
    this._utilityService.navigate('/main/order/index');
  }


}
