import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SendEmailComponent } from './send-email.component';
import { Routes, RouterModule } from '@angular/router';
import { ModalModule } from 'ngx-bootstrap';
import { FormsModule } from '@angular/forms';
import{TinyMceModule} from '../../shared/tiny-mce/tiny-mce.module';
import {PaginationModule} from 'ngx-bootstrap'
const sendEmailRouter: Routes = [
  { path: '', redirectTo: 'index', pathMatch: 'full' },
  { path: 'index', component: SendEmailComponent }
]

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ModalModule.forRoot(),
    RouterModule.forChild(sendEmailRouter),
    TinyMceModule,
    PaginationModule.forRoot(),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [SendEmailComponent]
})
export class SendEmailModule { }
