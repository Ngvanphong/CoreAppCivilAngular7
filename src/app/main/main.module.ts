import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import {mainRouter} from './main.router';
import {RouterModule} from '@angular/router';
import {SidebarMenuComponent} from '../shared/sidebar-menu/sidebar-menu.component';
import {TopbarMenuComponent} from '../shared/topbar-menu/topbar-menu.component'


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(mainRouter),
    
  ],
  declarations: [MainComponent,SidebarMenuComponent,TopbarMenuComponent]
})
export class MainModule { }
