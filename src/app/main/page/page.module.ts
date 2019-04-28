import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageComponent } from './page.component';
import {Routes,RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {ModalModule} from 'ngx-bootstrap';
import{TinyMceModule} from '../../shared/tiny-mce/tiny-mce.module';
const pageRouter:Routes=[
  {path:'',redirectTo:'index', pathMatch:'full'},
  {path:'index',component:PageComponent}
]

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(pageRouter),
    ModalModule.forRoot(),
    TinyMceModule,

  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA],
  declarations: [PageComponent]
})
export class PageModule { }
