import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColorComponent } from './color.component';
import {Routes,RouterModule} from '@angular/router';
import {ModalModule} from 'ngx-bootstrap';
import {FormsModule} from '@angular/forms';
const colorRouters:Routes=[
  {path:'',redirectTo:'index', pathMatch:'full'},
  {path:'index',component:ColorComponent}
]
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ModalModule.forRoot(),
    RouterModule.forChild(colorRouters)
  ],
  declarations: [ColorComponent]
})
export class ColorModule { }
