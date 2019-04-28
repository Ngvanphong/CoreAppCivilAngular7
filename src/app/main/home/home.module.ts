import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import {Routes,RouterModule} from '@angular/router';
const homeRoutes:Routes=[
  {path:'',redirectTo:'index',pathMatch:'full'},
  {path:'index',component:HomeComponent}
]
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(homeRoutes),

  ],
  declarations: [HomeComponent]
})
export class HomeModule { }
