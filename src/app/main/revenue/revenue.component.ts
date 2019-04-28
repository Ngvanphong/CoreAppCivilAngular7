import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../../core/service/data.service';
import { Chart } from 'chart.js'
declare var moment: any;

@Component({
  selector: 'app-revenue',
  templateUrl: './revenue.component.html',
  styleUrls: ['./revenue.component.css']
})
export class RevenueComponent implements OnInit {

  public fromDate: string = '';
  public toDate: string = '';
  public tableData: any[];
  public chart: any
  public totalRevenue:number;
  public totalProfif:number;

  private lineChartDataRevenue: any[] = [];

  private lineChartDataBenefif: any[] = [];

  private lineChartLabels: Array<any> = [];

  constructor(private _dataService: DataService) {

  }

  ngOnInit() {
    this.loadRevenues();
  }
  loadRevenues() {
    this.totalProfif=0;
    this.totalRevenue=0;
    if (this.fromDate != '' && this.toDate != '') {
      this.fromDate = moment(this.fromDate).format('MM/DD/YYYY');
      this.toDate = moment(this.toDate).format('MM/DD/YYYY');
    }
    this._dataService.get('/api/report/revenue?fromDate=' + this.fromDate + '&toDate=' + this.toDate)
      .subscribe((response: any[]) => {
        this.lineChartLabels = [];
        this.lineChartDataRevenue = [];
        this.lineChartDataBenefif = [];
        this.tableData = [];
        for (let item of response) {
          this.lineChartDataBenefif.push(item.Profit);
          this.lineChartDataRevenue.push(item.Revenue);
          this.lineChartLabels.push(moment(item.Date).format('MM/DD/YYYY'));
          //push to table
          this.tableData = response;
          this.totalProfif=this.totalProfif+item.Profit;
          this.totalRevenue=this.totalRevenue+item.Revenue;
        }
        this.rawCanvat()
      });

  }

  private rawCanvat() {
    this.chart = new Chart('canvas', {
      type: 'line',
      data: {
        labels: this.lineChartLabels,
        datasets: [
          {
            data: this.lineChartDataBenefif,
            borderColor: "#3cba9f",
            fill: false,
            label:"Lợi nhuận",
          },
          {
            data: this.lineChartDataRevenue,
            borderColor: "#ffcc00",
            fill: false,
            label:"Doanh thu",
          },
        ]
      },
      options: {
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            display: true
          }],
          yAxes: [{
            display: true
          }],
        }
      }
    });

  }


}
