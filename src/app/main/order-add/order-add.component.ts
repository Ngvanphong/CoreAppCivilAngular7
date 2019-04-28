import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { DataService } from '../../core/service/data.service';
import { UtilityService } from '../../core/service/utility.service';
import { NgForm} from '@angular/forms';
import { NotificationService } from '../../core/service/notification.service';
import {SignalrService} from '../../core/service/signalr.service'
@Component({
  selector: 'app-order-add',
  templateUrl: './order-add.component.html',
  styleUrls: ['./order-add.component.css']
})
export class OrderAddComponent implements OnInit {
  @ViewChild('addEditModal') public addEditModal: ModalDirective;
  public entity: any = { Status: true };
  public sizeId: number = null;
  public colorId: number = null;
  public sizes: any[];
  public colors: any[];
  public products: any[];
  public orderDetails: any[] = [];
  public detailEntity: any = {
    ProductId: 0,
    Quantity: 0,
    Price: 0
  };
  constructor(private _dataService: DataService, private _utilityService: UtilityService,
    private _notificationService: NotificationService,private _signalrService:SignalrService) { }

  ngOnInit() {
  }

  public showAddDetail() {
    this.loadSizes();
    this.loadProducts();
    this.loadColor();
    this.addEditModal.show();
  }

  public loadProducts() {
    this._dataService.get('/api/product/getallparents').subscribe((response: any[]) => {
      this.products = response;
    });
  }

  public loadSizes() {
    this._dataService.get('/api/productQuantity/getsizes').subscribe((response: any[]) => {
      this.sizes = response;
    });
  }
  public loadColor() {
    this._dataService.get('/api/productQuantity/getcolors').subscribe((response: any[]) => {
      this.colors = response;
    });
  }

  public goBack() {
    this._utilityService.navigate('/main/order/index');
  }

  public saveChanges(form: NgForm) {
    if (form.valid) {
      this.entity.BillDetails = this.orderDetails;
      this._dataService.post('/api/order/add', JSON.stringify(this.entity)).subscribe((response: any) => {
        if (response != undefined) {
          this._signalrService.sendAnnoucement(response)
          this.goBack();
        }
      });
    }
  }

  public loadPrice($event) {
    this.detailEntity.Product = this.products.find(x => x.Id == this.detailEntity.ProductId);
    this.detailEntity.OriginalPrice= this.detailEntity.Product.OriginalPrice;
    this.detailEntity.Price = this.detailEntity.Product.PromotionPrice ? this.detailEntity.Product.PromotionPrice : this.detailEntity.Product.Price
  }

  public saveOrderDetail(valid:boolean) {
    if (valid) {
      this.detailEntity.Product = this.products.find(x => x.Id == this.detailEntity.ProductId);
      this.detailEntity.Size = this.sizes.find(x => x.Id == this.detailEntity.SizeId);
      this.detailEntity.Color = this.colors.find(x => x.Id == this.detailEntity.ColorId);
     
      let flag: boolean = true;
      for (var item of this.orderDetails) {
        if (item.ProductId == this.detailEntity.ProductId && item.SizeId == this.detailEntity.SizeId && item.ColorId == this.detailEntity.ColorId) {
          flag = false;
        }
      }
      if (flag == true) {
        this.orderDetails.push(this.detailEntity);
      }
      else {
        this._notificationService.printErrorMessage("Sản phẩm đã tồn tại")
      }
      this.detailEntity = {
        ProductId: 0,
        Quantity: 0,
        Price: 0,
      };
    }
  }

  //Action delete
  public deleteDetail(item: any) {
    for (var index = 0; index < this.orderDetails.length; index++) {
      let orderDetail = this.orderDetails[index];
      if (orderDetail.ProductId == item.ProductId
        && orderDetail.SizeId == item.SizeId && orderDetail.ColorId == item.ColorId) {
        this.orderDetails.splice(index, 1);
      }
    }
  }


}
