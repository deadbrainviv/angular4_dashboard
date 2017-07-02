import { Component, OnInit, Input} from '@angular/core';
import {Router} from '@angular/router';
import {Subject} from 'rxjs/Subject';
import {AuthService} from '../auth.service';
import {User} from "../user";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [],
  providers: [
    AuthService
  ]
})
export class RegisterComponent implements OnInit {

  result: Subject<any>;
  constructor(private router: Router, private authService: AuthService) { }

  //user = new User('', '', '');
  // user = {
  //   username: '',
  //   password: '',
  //   email: ''
  // };
  @Input() public username: string;
  @Input() public password: string;
  @Input() public email: string;
  ngOnInit() {
  }

  register(event) {
    event.preventDefault();
    console.log('Register');
    let userMeta = {
      name: '',
      user: '',
      pass: '',
      email: '',
      country: 'Denmark'
    }
    userMeta.name = this.username;
    userMeta.user = this.username;
    userMeta.pass = this.password;
    userMeta.email = this.email;
    console.log(userMeta);
    this.authService.register(userMeta)
        .subscribe(
            success => {
              console.log(success);
              },
            error => {
              console.log(error);
            }
        );

    this.router.navigate(['/main/dashboard']);

  }
}