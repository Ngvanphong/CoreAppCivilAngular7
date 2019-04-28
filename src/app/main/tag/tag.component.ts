import { Component, OnInit} from '@angular/core';
import { DataService } from '../../core/service/data.service';
import { NotificationService } from '../../core/service/notification.service';
import { MessageConstant } from '../../core/common/message.constant';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.css']
})
export class TagComponent implements OnInit {
  public tags:any;
  public totalRow: number;
  public pageIndex: number = 1;
  public pageSize: number = 10;
  public pageDisplay: number = 7;
  public filter: any = '';

  constructor(private _dataService: DataService, private _notificationService: NotificationService) { }

  ngOnInit() {
    this.search();
  }

  pageChanged(event: any): void {
    this.pageIndex = event.page;
    this.search();
  }

  public search() {
    this._dataService.get('/api/tag/getall?page=' + this.pageIndex + '&pageSize=' + this.pageSize + '&filter=' + this.filter).subscribe((res: any) => {
      this.tags = res.Items;
      this.pageIndex = res.PageIndex;
      this.totalRow = res.TotalRows;
    });
  }
  public searchIndex(){
    this.pageIndex=1;
    this.search();
  }

 
  deleteAllTagNotUse() {
    this._notificationService.printConfirmationDialog(MessageConstant.CONFIRM_DELETE_MEG, () => this.deleteConfirmAllTagNotUse())
  }
  private deleteConfirmAllTagNotUse() {
    this._dataService.deleteAllTagNotUse("/api/tag/deletealltagnotuse").subscribe((res) => {     
      this.search();
    })
  }


}
