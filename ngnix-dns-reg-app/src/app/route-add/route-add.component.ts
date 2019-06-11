import { Component, OnInit, Input } from '@angular/core';
import { CreateDns } from '../shared/create-dns';
import { RouteServiceService } from '../route-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-route-add',
  templateUrl: './route-add.component.html',
  styleUrls: ['./route-add.component.css']
})
export class RouteAddComponent implements OnInit {

  test = ""
  @Input() model = new CreateDns("example.youthclubstage.de","192.168.22.1:80")

  constructor(private service: RouteServiceService, private router: Router) { }

  ngOnInit() {
  }

  submitted = false;

  onSubmit() { this.submitted = true;
    this.service.addData(this.model).subscribe( x => this.router.navigate(['/show'])) 
  }

  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.model); }

}
