import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostAddComponent } from './post-add.component';
import{TinyMceModule} from '../../shared/tiny-mce/tiny-mce.module';
import {FormsModule} from '@angular/forms';
import {Routes,RouterModule} from '@angular/router';
import {ModalModule} from 'ngx-bootstrap'

const postAddRouter:Routes=[
  {path:'',redirectTo:'index',pathMatch:'full'},
  {path:'index/:id',component:PostAddComponent}
]
@NgModule({
  imports: [
    CommonModule,
    TinyMceModule,
    FormsModule,
    RouterModule.forChild(postAddRouter),
    ModalModule.forRoot(),
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA],
  declarations: [PostAddComponent]
})
export class PostAddModule { }
