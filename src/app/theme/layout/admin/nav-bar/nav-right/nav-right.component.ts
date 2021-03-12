import {Component, OnInit} from '@angular/core';
import {NgbDropdownConfig} from '@ng-bootstrap/ng-bootstrap';
import {GlobalService } from '../../../../../services/global.service';
import {Router} from '@angular/router'
@Component({
  selector: 'app-nav-right',
  templateUrl: './nav-right.component.html',
  styleUrls: ['./nav-right.component.scss'],
  providers: [NgbDropdownConfig]
})
export class NavRightComponent implements OnInit {

  constructor(public global: GlobalService, public route : Router) { }

  ngOnInit() { }

  logout(){
    this.global.storage.remove('userdata');
    this.global.storage.remove('token');
    localStorage.clear();
    this.route.navigateByUrl('/login');
  }
}
