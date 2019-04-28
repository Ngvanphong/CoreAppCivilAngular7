import { BrowserModule } from '@angular/platform-browser';
import { NgModule} from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {LoginModule} from './login/login.module';
import {MainModule} from './main/main.module';
import {HttpClientModule} from '@angular/common/http'
import {NotificationService} from '../app/core/service/notification.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    LoginModule,
    MainModule, 
  ],
 
  providers: [ NotificationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
