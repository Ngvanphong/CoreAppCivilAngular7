import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderComponent } from './order.component';
import {FormsModule} from '@angular/forms';
import{Routes,RouterModule} from '@angular/router';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { PaginationModule,ModalModule } from 'ngx-bootstrap';


const orderRouter:Routes=[
  {path:'',redirectTo:'index',pathMatch:'full'},
  {path:'index', component:OrderComponent}
]

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(orderRouter),  
    BsDatepickerModule.forRoot(), 
    PaginationModule.forRoot(), 
    ModalModule.forRoot(),
  ],
  declarations: [OrderComponent]
})
export class OrderModule { }
