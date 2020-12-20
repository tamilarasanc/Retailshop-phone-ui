import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../services/auth/auth.service";
import {CommonService} from "../services/common/common.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  shopName = 'Retail Mobile Shop';
  user: {};
  userLogged = false;
  constructor(private _router: Router,
              private authService: AuthService,
              private commonService: CommonService) { }

  ngOnInit() {
    this.commonService.userSubject.subscribe(reload => {
      if(reload) {
        this.reloadHeader();
      }
    });
    this.reloadHeader();
  }

  reloadHeader() {
    const user = localStorage.getItem('currentUser');
    if(user) {
      this.authService.role = localStorage.getItem('role');
      this.user = JSON.parse(user);
      this.userLogged = true;
    } else {
      this.userLogged = false;
    }
  }

  logout() {
    localStorage.clear();
    this.commonService.updateLoggedUser(true)
    this.authService.role = '';
    this._router.navigate(['/products']);
  }

}
