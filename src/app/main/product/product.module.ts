import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product.component';
import {Routes,RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import { PaginationModule } from 'ngx-bootstrap';
import { ModalModule } from 'ngx-bootstrap';
import{TinyMceModule} from '../../shared/tiny-mce/tiny-mce.module';
const productRouter:Routes=[
  {path:'',redirectTo:'index', pathMatch:'full'},
  {path:'index',component:ProductComponent}
]
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(productRouter),
    FormsModule,
    ModalModule.forRoot(),
    PaginationModule.forRoot(),
    TinyMceModule,
  ],
  declarations: [ProductComponent]
})
export class ProductModule { }
