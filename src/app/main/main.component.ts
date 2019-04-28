import { Component, OnInit, AfterViewInit } from '@angular/core';
declare const $:any;
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, AfterViewInit {

  constructor() { }

  ngOnInit() {
  }
  ngAfterViewInit(){
    $.getScript('./assets/js/off-canvas.js');
  }

}
