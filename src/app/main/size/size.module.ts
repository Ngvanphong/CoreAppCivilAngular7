import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SizeComponent } from './size.component';
import {Routes,RouterModule} from '@angular/router';
import {ModalModule} from 'ngx-bootstrap';
import {FormsModule} from '@angular/forms';
const sizeRouters:Routes=[
  {path:'',redirectTo:'index', pathMatch:'full'},
  {path:'index',component:SizeComponent}
]

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ModalModule.forRoot(),
    RouterModule.forChild(sizeRouters)
  ],
  declarations: [SizeComponent]
})
export class SizeModule { }
