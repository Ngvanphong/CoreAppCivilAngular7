import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogopantnerComponent } from './logopantner.component';
import {FormsModule} from '@angular/forms';
import {ModalModule} from "ngx-bootstrap";
import {Routes,RouterModule} from "@angular/router";

const logopantnerRouter:Routes=[
  {path:'',redirectTo:'index',pathMatch:'full'},
  {path:'index',component:LogopantnerComponent}
]

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(logopantnerRouter),
    ModalModule.forRoot(),
  
  ],
  declarations: [LogopantnerComponent]
})
export class LogopantnerModule { }
