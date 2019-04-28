import { Injectable,EventEmitter} from '@angular/core';
import * as signalR from "@aspnet/signalr";
import { AuthenService } from '../service/authen.service';
import {SystemConstant} from '../../core/common/system.constant';
@Injectable({
  providedIn: 'root'
})
export class SignalrService {
  public announcementReceived: EventEmitter<any> =new EventEmitter<any>();
  private  baseFolder:string=SystemConstant.BASE_API;
  private connection: any;
  constructor() {
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl(this.baseFolder+"/hub")
      .build();
    this.connection.start().catch(err => document.write(err));
    this.connection.on("messageReceived", (message: string) => { 
     this.announcementReceived.emit(message)
    });
  }
  public sendAnnoucement(message){
    this.connection.send("newMessage",message)
  }

}
