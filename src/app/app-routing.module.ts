import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {GuardGuard} from './core/guards/auth.guard.guard'
const routes: Routes = [
  {path:'',redirectTo:'login', pathMatch:'full'},
  {path:'login', loadChildren:'./login/login.module#LoginModule'},
  {path:'main', loadChildren:'./main/main.module#MainModule',canActivate:[GuardGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],  
})
export class AppRoutingModule { }
