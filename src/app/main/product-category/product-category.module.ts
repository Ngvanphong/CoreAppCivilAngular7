import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCategoryComponent } from './product-category.component';
import { TreeModule } from 'angular-tree-component';
import {FormsModule} from '@angular/forms';
import {ModalModule} from 'ngx-bootstrap';
import {Routes,RouterModule} from '@angular/router';
const productCategoryRouter:Routes=[
  {path:'',redirectTo:'index',pathMatch:'full'},
  {path:'index', component:ProductCategoryComponent}
]

@NgModule({
  imports: [
    CommonModule,
    TreeModule.forRoot(),
    FormsModule,
    ModalModule.forRoot(),
    RouterModule.forChild(productCategoryRouter), 
  ],
  declarations: [ProductCategoryComponent]
})
export class ProductCategoryModule { }
