import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FuntionComponent } from './funtion.component';
import {Routes,RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {ModalModule} from 'ngx-bootstrap';
import {TreeModule} from 'angular-tree-component'

const funtionRouter:Routes=[
  {path:'',redirectTo:'index',pathMatch:'full'},
  {path:'index',component:FuntionComponent}
  
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(funtionRouter),
    TreeModule.forRoot(),
    FormsModule,
    ModalModule.forRoot()
  ],
  declarations: [FuntionComponent]
})
export class FuntionModule { }
