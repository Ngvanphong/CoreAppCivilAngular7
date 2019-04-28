import { Component, OnInit } from '@angular/core';
import { DataService } from '../../core/service/data.service';
import {AuthenService} from '../../core/service/authen.service';
import {SystemConstant} from '../../core/common/system.constant'
@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.css']
})
export class SidebarMenuComponent implements OnInit {
  public functions: any[];
  public userLogin:any;
  public baseFolder:string=SystemConstant.BASE_API;
  constructor(private _dataService: DataService,private _authenService:AuthenService) { }

  ngOnInit() {
    this._dataService.get('/api/Function/getlisthierarchy').subscribe((response: any[]) => {
      if (response != null) {
        this.functions = response.sort((n1, n2) => {
          if (n1.DisplayOrder > n2.DisplayOrder)
            return 1;
          else if (n1.DisplayOrder < n2.DisplayOrder)
            return -1;
          return 0;
        });
      }       
    });
    this.getUser();
  }

  private getUser(){
   this.userLogin= this._authenService.getUserLogin()
  }



}
