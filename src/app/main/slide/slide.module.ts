import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlideComponent } from './slide.component';
import {Routes,RouterModule} from '@angular/router';
import {ModalModule} from 'ngx-bootstrap';
import { PaginationModule } from 'ngx-bootstrap';
import {FormsModule} from '@angular/forms'

const slideRouter:Routes=[
  {path:'', redirectTo:'index', pathMatch:'full'},
  {path:'index',component:SlideComponent}
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(slideRouter),
    ModalModule.forRoot(),
    PaginationModule.forRoot(),
  ],
  declarations: [SlideComponent]
})
export class SlideModule { }
