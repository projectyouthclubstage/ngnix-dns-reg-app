import { Component, OnInit, Output, Input } from '@angular/core';
import { RouteServiceService } from '../route-service.service';
import { NginxReg } from '../shared/nginx-reg';

@Component({
  selector: 'app-route-list',
  templateUrl: './route-list.component.html',
  styleUrls: ['./route-list.component.css']
})
export class RouteListComponent implements OnInit {

  @Output() x : NginxReg
  constructor(private service: RouteServiceService) { 
    console.log(this.x);
    this.getData();
  }

  getData(){
    this.service.getData().subscribe(data => {this.x = data});
  }

  delete(id: string){
    this.service.deleteData(id).subscribe(x => this.getData());
  }

  ngOnInit() {
  }
 
}
