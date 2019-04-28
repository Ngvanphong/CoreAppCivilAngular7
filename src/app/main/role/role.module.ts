import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoleComponent } from './role.component';
import {Routes,RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {ModalModule} from 'ngx-bootstrap';
import { PaginationModule } from 'ngx-bootstrap';

const roleRouter:Routes=[
  {path:'',redirectTo:'index',pathMatch:'full'},
  {path:'index',component:RoleComponent}
]
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(roleRouter),
    FormsModule,
    ModalModule.forRoot(),
    PaginationModule.forRoot(),
  ],
  declarations: [RoleComponent]
})
export class RoleModule { }
