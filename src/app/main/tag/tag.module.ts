import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TagComponent } from './tag.component';
import {Routes,RouterModule} from '@angular/router';
import { PaginationModule } from 'ngx-bootstrap';
import {FormsModule} from '@angular/forms'

const tagRouter:Routes=[
  {path:'', redirectTo:'index', pathMatch:'full'},
  {path:'index',component:TagComponent}
];

@NgModule({
  imports: [
    CommonModule,
    PaginationModule.forRoot(),
    FormsModule,
    RouterModule.forChild(tagRouter),
  ],
  declarations: [TagComponent]
})
export class TagModule { }
