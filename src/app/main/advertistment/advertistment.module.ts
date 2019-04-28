import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdvertistmentComponent } from './advertistment.component';
import {FormsModule} from '@angular/forms';
import {ModalModule} from "ngx-bootstrap";
import {Routes,RouterModule} from "@angular/router";
import {PaginationModule} from 'ngx-bootstrap';


const advertistmentRouter:Routes=[
  {path:'',redirectTo:'index',pathMatch:'full'},
  {path:'index',component:AdvertistmentComponent}
]

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(advertistmentRouter),
    ModalModule.forRoot(),
    PaginationModule.forRoot(),
   
  ],
  declarations: [AdvertistmentComponent]
})
export class AdvertistmentModule { }
