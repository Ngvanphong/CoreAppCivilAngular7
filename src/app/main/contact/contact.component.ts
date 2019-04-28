import { Component, OnInit } from '@angular/core';
import {DataService} from '../../core/service/data.service';
import {AuthenService} from '../../core/service/authen.service';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  public entity:any={Id:"Default"};
  public flagAdd=true;
  constructor(private _dataService:DataService,public _authenService:AuthenService) { }

  ngOnInit() {
    this.getContact();
  }

 private getContact(){
    this._dataService.get("/api/contact/getall").subscribe((res)=>{
      if(res!=undefined&&res!=null&&res!='') 
      {
        this.entity=res;
        this.flagAdd=false;
      };
    })
}

  public saveChanges(valid:boolean){
    if(valid){
      if(this.flagAdd==true){
        this._dataService.post("/api/contact/add",this.entity).subscribe((res)=>{        
        })
      }
      else{
        this._dataService.put("/api/contact/update",this.entity).subscribe((res)=>{         
        })
      }
    }
  }


}
