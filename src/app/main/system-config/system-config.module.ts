import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SystemConfigComponent } from './system-config.component';
import {Routes,RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap';
import {ModalModule} from 'ngx-bootstrap'
const systemConfigRouter:Routes=[
  {path:'',redirectTo:'index',pathMatch:'full'},
  {path:'index',component:SystemConfigComponent}
]
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(systemConfigRouter),
    BsDatepickerModule.forRoot(), 
    ModalModule.forRoot(),
  ],
  declarations: [SystemConfigComponent]
})
export class SystemConfigModule { }
