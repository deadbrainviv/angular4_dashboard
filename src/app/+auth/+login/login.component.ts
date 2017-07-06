import { Component, OnInit, Input} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  providers: [
      AuthService
  ]
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService) { }
  @Input() public username: string;
  @Input() public password: string;

  ngOnInit() {
  }

  login(event){
    event.preventDefault();
    let userMeta = {
      user: this.username,
      pass: this.password
    };
    console.log(userMeta);
    this.authService.login(userMeta)
        .subscribe(
            user => {
              localStorage.setItem('user', userMeta.user);
              localStorage.setItem('pass', userMeta.pass);
              console.log('user logged in');
              this.router.navigate(['/main/dashboard/analytics'])
            },
            error => {
              console.log(error);
            }
        );

  }

}
