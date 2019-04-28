import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangepassComponent } from './changepass.component';
import {FormsModule} from '@angular/forms';
import{Routes,RouterModule} from '@angular/router';


const changeRouter:Routes=[
  {path:'',redirectTo:'index',pathMatch:'full'},
  {path:'index', component:ChangepassComponent}
]
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(changeRouter),
  ],
  declarations: [ChangepassComponent]
})
export class ChangepassModule { }
