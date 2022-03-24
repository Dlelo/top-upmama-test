import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {tap} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TopupmamaService {

  private baseUrl = `https://reqres.in/api/`;
  private register = 'register'

  loginCookie: any;
  jwt: any;
  access_token;
  refresh_token;
  jwt_exp: any;
  current_time:any;

  constructor(private http: HttpClient,
              private _router: Router) {

    this.jwt = localStorage.getItem('jtw');
    this.access_token = localStorage.getItem('access_token');
    this.refresh_token = localStorage.getItem('refresh_token');
  }


  registerUser(data: any) {
    return this.http.post<any>(`${this.baseUrl + this.register}`, data, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    });
  }

  // logout
  logoutUser(): void {
    localStorage.clear();
    this._router.navigate(['/home']);
  }

  // get refresh token
  getToken() {
    return localStorage.getItem('access_token');
  }

  // check if the user is logged in
  loggedIn(): boolean {
    this.loginCookie = localStorage.getItem('loginStatus');
    if (this.loginCookie === '1') {
      if (localStorage.getItem('jwt') === null || localStorage.getItem('jwt') === undefined) {
        return false;
      }else {
        return true;
      }
    }
    return false;
  }


  getAccessToken() {
    return localStorage.getItem('access_token');
  }

  getRefreshToken() {
    return localStorage.getItem('refresh_token');
  }

  setAccessToken(accessToken: string) {
    localStorage.setItem('access_token', accessToken);
  }

  // getNewAccessToken() {
  //   return this.http.get(`${this.baseUrl + this._refreshToken}`, {
  //     observe: 'response'
  //   }).pipe(
  //     tap((res: HttpResponse<any>) => {
  //       this.setAccessToken(res.headers.get('access_token'));

  //       console.log('new access token', res);
  //     })
  //   );
  // }

  // refreshAccessToken(data: any) {
  //   return this.http.post(`${this.baseUrl + this._refreshToken}`, data);
  // }
}
