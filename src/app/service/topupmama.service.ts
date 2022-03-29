import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {map, tap} from 'rxjs/operators';
import {BehaviorSubject, Observable} from 'rxjs';
import { Todo, User } from '../dashboard/users/users';
import { CookieService } from 'ngx-cookie';


@Injectable({
  providedIn: 'root'
})
export class TopupmamaService {

  private baseUrl = `https://reqres.in/api/`;
  private register = 'register';
  private _login ='login'
  private getUsers = 'users?page=2'
  private singleUser = 'users?id='
  private singleUserUpdate = 'users'
  private singleUserDelete = 'users'
  private _updateUser = 'users'
  private _deleteUser = 'users'
  private userSubject!: BehaviorSubject<User>;
  public user!: Observable<User>;

  loginCookie: any;
  jwt: any;
  // access_token;
  // refresh_token;
  jwt_exp: any;
  current_time:any;

  constructor(private http: HttpClient,
              private _router: Router,
              private cookiesService:CookieService) {

    // this.access_token = localStorage.getItem('access_token');
    // this.refresh_token = localStorage.getItem('refresh_token');
    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user') || '{}'));
    this.user = this.userSubject.asObservable();
  }


  registerUser(email: any, password: any) {
    return this.http.post<any>(`${this.baseUrl + this.register}`, {email, password}, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    });
  }

  // logout
  logoutUser(): void {
    localStorage.clear();
    this._router.navigate(['/login']);
  }

  // get refresh token
  getToken() {
    return localStorage.getItem('access_token');
  }

  // check if the user is logged in
  loggedIn(): boolean {
    this.loginCookie = localStorage.getItem('user');
      if (localStorage.getItem('user') === null || localStorage.getItem('user') === undefined) {
        return false;
      }else {
        return true;
      }
    }




  getAccessToken() {
    return this.cookiesService.getAll();
  }

  getRefreshToken() {
    return localStorage.getItem('refresh_token');
  }

  setAccessToken(accessToken: string) {
    localStorage.setItem('access_token', accessToken);
  }
  getAUser(id: string): Observable<any> {
    return this.http.get<Todo>(`${this.baseUrl+this.singleUser}${id}`);
  }

  createTodo(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(`${this.baseUrl}`, todo);
  }

  updateUser(id: string, value: Todo): Observable<object> {
    return this.http.patch<Todo>(`${this.baseUrl+this._updateUser}/${id}`, value);
  }

  deleteUser(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl +this._deleteUser}/${id}`, { responseType: 'text' });
  }

  // Get all Todos
  getTodoList(): Observable<any> {
    return this.http.get<Todo[]>(`${this.baseUrl + this.getUsers}`);
  }
  public get userValue(): User {
    return this.userSubject.value;
  }

login(username: any, password: any) {
    return this.http.post<User>(`${this.baseUrl+this._login}`, { username, password })
        .pipe(map(user => {
          this.jwt = this.cookiesService.get('OursiteJWT')
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('jwt', JSON.stringify(this.jwt));
            localStorage.setItem('user', JSON.stringify(user));
            this.userSubject.next(user);
            return user;
        }));
}

logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('token');

    //this.userSubject.next(null);
    this._router.navigate(['/login']);
}

registerAUser(user: User) {
    return this.http.post(`${this.baseUrl+this.register}`, user);
}

getAll() {
    return this.http.get<User[]>(`${this.baseUrl+this.getUsers}`);
}
getById(id: string) {
  return this.http.get<User>(`${this.baseUrl+this.singleUser}/${id}`);
}

update(id: string, params: any) {
  return this.http.put(`${this.baseUrl+this.singleUserUpdate}/users/${id}`, params)
      .pipe(map(x => {
          // update stored user if the logged in user updated their own record
          if (id == this.userValue.id) {
              // update local storage
              const user = { ...this.userValue, ...params };
              localStorage.setItem('user', JSON.stringify(user));

              // publish updated user to subscribers
              this.userSubject.next(user);
          }
          return x;
      }));
}

delete(id: string) {
  return this.http.delete(`${this.baseUrl+this.singleUserDelete}/${id}`)
      .pipe(map(x => {
          // auto logout if the logged in user deleted their own record
          if (id == this.userValue.id) {
              this.logout();
          }
          return x;
      }));
}
}
