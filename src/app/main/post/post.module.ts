import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostComponent } from './post.component';
import {Routes,RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import { PaginationModule } from 'ngx-bootstrap';
import {ModalModule} from 'ngx-bootstrap';

const postRouter:Routes=[
  {path:'',redirectTo:'index',pathMatch:'full'},
  {path:'index',component:PostComponent}
]
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(postRouter),
    FormsModule,
    PaginationModule.forRoot(),
    ModalModule.forRoot(),  
  ],
  declarations: [PostComponent]
})
export class PostModule { }
