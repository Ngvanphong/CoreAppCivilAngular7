import { Component, OnInit,NgZone } from '@angular/core';
import {AuthenService} from '../../core/service/authen.service';
import {LoggedInUser} from '../../core/domain/loginin.user';
import {SystemConstant} from '../../core/common/system.constant';
import {UtilityService} from '../../core/service/utility.service';
import {UrlConstant} from '../../core/common/url.constant';
import {DataService} from '../../core/service/data.service';
import {Router} from '@angular/router';
import {SignalrService} from '../../core/service/signalr.service';

declare var  moment:any;
@Component({
  selector: 'app-topbar-menu',
  templateUrl: './topbar-menu.component.html',
  styleUrls: ['./topbar-menu.component.css']
})
export class TopbarMenuComponent implements OnInit {
  public user: LoggedInUser;
  public baseFolder: string = SystemConstant.BASE_API;
  public canSendMessage: Boolean;
  public announcements: any[];

  constructor(private _autenServie:AuthenService, private _utilityService :UtilityService,
    private _dataService:DataService, private _router:Router,private _signalRService: SignalrService, private _ngZone:NgZone) {
      this.subscribeToEvents();
     }

  ngOnInit() {
    this.user=this._autenServie.getUserLogin();
    this.loadAnnouncements();
  }
  
  logout() {
    localStorage.removeItem(SystemConstant.CURRENT_USER);
    this._utilityService.navigate(UrlConstant.lOGIN);
  }

  markAsRead(id: number) {
    this._dataService.get('/api/orderuserannoucement/markAsRead?id=' + id.toString()).subscribe((response: any) => {
      if (response) {
        this.loadAnnouncements();
        this._router.navigate(['/main/order/detail/'+id]);
      }
    });
  }

  private subscribeToEvents(): void {
    var self = this;
    self.announcements = []; 
    // finally our service method to call when response received from server event and transfer response to some variable to be shwon on the browser.  
    this._signalRService.announcementReceived.subscribe((announcement: any) => {
      this._ngZone.run(() => {
        announcement.DateCreated = moment(announcement.DateCreated).fromNow();
        self.announcements.push(announcement);
      });
    });
  }

  private loadAnnouncements() {
    this._dataService.get('/api/orderuserannoucement/getTopMyAnnouncement').subscribe((response: any) => {
      this.announcements = [];
      for (let item of response) {
        item.DateCreated = moment(item.DateCreated).fromNow();
        this.announcements.push(item);
      }
    });
  }

  
 


}
