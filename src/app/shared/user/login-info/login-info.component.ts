import {Component, OnInit} from '@angular/core';
import {UserService} from "../user.service";
import {LayoutService} from "../../layout/layout.service";

@Component({

  selector: 'sa-login-info',
  templateUrl: './login-info.component.html',
})
export class LoginInfoComponent implements OnInit {

  user:any;

  constructor(
    private userService: UserService,
              private layoutService: LayoutService) {
  }

  ngOnInit() {
    console.log(localStorage.getItem('user'));
    this.userService.getLoginInfo().subscribe(user => {
      this.user = user;
      this.user.username = localStorage.getItem('user');
    })

  }

  toggleShortcut() {
    this.layoutService.onShortcutToggle()
  }

}
