import { Component, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-route-list',
  templateUrl: './route-list.component.html',
  styleUrls: ['./route-list.component.css']
})
export class RouteListComponent implements OnInit {

  @Output() x = [{ "id" : 1 , "source" : "x", "target": "t"},{ "id" : 1 , "source" : "x", "target": "t"},];

  constructor() { 
    console.log(this.x);
  }

  ngOnInit() {
  }

}
