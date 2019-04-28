import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactComponent } from './contact.component';
import {Routes,RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';

const contactRouter:Routes=[
    {path:'',redirectTo:'index',pathMatch:'full'},
    {path:'index',component:ContactComponent}
]
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(contactRouter),
    
  ],
  declarations: [ContactComponent]
})
export class ContactModule { }
