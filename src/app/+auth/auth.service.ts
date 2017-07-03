import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
import {Http, Headers, RequestOptions} from '@angular/http';

@Injectable()
export class AuthService {
  isLoggedIn: boolean = false;

  // store the URL so we can redirect after logging in
  redirectUrl: string;

  constructor (private http: Http){}
  login(userMeta): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post('http://198.199.119.233:3000/', JSON.stringify(userMeta), options)
        .map(res => {
          let body = res.json();
          return body.data || { };
        })
        .catch(error => {
          console.log(error);
          let errMsg: string;
          if (error instanceof Response) {
            const body = error.json() || '';
            const err = body || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
          } else {
            errMsg = error.message ? error.message : error.toString();
          }
          console.log(errMsg);
          return Observable.throw(errMsg);
        })
  }

  register(userMeta):Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post('http://198.199.119.233:3000/signup', JSON.stringify(userMeta), options)
        .map(res => {
          let body = res.json();
          return body.data || { };
        })
        .catch(error => {
          let errMsg: string;
          if (error instanceof Response) {
            const body = error.json() || '';
            const err = body || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
          } else {
            errMsg = error.message ? error.message : error.toString();
          }
          console.log(errMsg);
          return Observable.throw(errMsg);
        })
  }

  logout(): void {
    this.isLoggedIn = false;
  }
}
