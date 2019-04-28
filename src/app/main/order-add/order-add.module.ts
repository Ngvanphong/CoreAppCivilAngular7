import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderAddComponent } from './order-add.component';
import {FormsModule} from '@angular/forms';
import {ModalModule} from 'ngx-bootstrap';
import{Routes,RouterModule} from '@angular/router';
const orderAddRouter:Routes=[
  {path:'',redirectTo:'index',pathMatch:'full'},
  {path:'index', component:OrderAddComponent}
]
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ModalModule.forRoot(),
    RouterModule.forChild(orderAddRouter),    
  ],
  declarations: [OrderAddComponent]
})
export class OrderAddModule { }
