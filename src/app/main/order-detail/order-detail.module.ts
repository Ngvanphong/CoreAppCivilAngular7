import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderDetailComponent } from './order-detail.component';
import {Routes,RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
const orderDetailRouter:Routes=[
  {path:'',redirectTo:'index',pathMatch:'full'},
  {path:'index', component:OrderDetailComponent}
]

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(orderDetailRouter)
  ],
  declarations: [OrderDetailComponent]
})
export class OrderDetailModule { }
