import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RevenueComponent } from './revenue.component';
import {Routes,RouterModule} from '@angular/router';
import {BsDatepickerModule} from 'ngx-bootstrap';
import {FormsModule} from '@angular/forms';
const revenueRouter:Routes=[
  {path:'',redirectTo:'index',pathMatch:'full'},
  {path:'index',component:RevenueComponent}
]
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(revenueRouter),
    BsDatepickerModule.forRoot(), 
  ],
  declarations: [RevenueComponent]
})
export class RevenueModule { }
