import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import {Routes,RouterModule} from '@angular/router';
import { PaginationModule } from 'ngx-bootstrap';
import {FormsModule} from '@angular/forms';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { BsDatepickerModule } from 'ngx-bootstrap';
import {ModalModule} from 'ngx-bootstrap';


const userRouter:Routes=[
  {path:'',redirectTo:'index',pathMatch:'full'},
  {path:'index',component:UserComponent}
]
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ModalModule.forRoot(),
    RouterModule.forChild(userRouter),
    PaginationModule.forRoot(),
    NgMultiSelectDropDownModule.forRoot(),
    BsDatepickerModule.forRoot(),

  ],
  declarations: [UserComponent]
})
export class UserModule { }
