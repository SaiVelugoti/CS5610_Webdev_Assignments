import {Injectable} from '@angular/core';
import {Http, RequestOptions, Response} from '@angular/http';
import 'rxjs/Rx';
import {environment} from '../../environments/environment';
import {Router} from '@angular/router';
import {SharedService} from './shared.service.client';

@Injectable()
export class UserService {

  // Asgn 6
  options: RequestOptions = new RequestOptions();
  baseUrl = environment.baseUrl;

  constructor(private _http: Http, private sharedService: SharedService, private router: Router) {
  }

  findUsers() {
    const url = this.baseUrl + '/api/users/';
    return this._http.get(url).map((response: Response) => {
    });
  }

  // Asgn 6
  // register(username, password) {
  //   const url = 'http://localhost:3100/api/register';
  //   const credentials = {
  //     username: username,
  //     passwrod: password
  //   };
  //   this.options.withCredentials = true;
  // }

  login(username: String, password: String) {
    this.options.withCredentials = true;
    const body = {
      username: username,
      password: password
    };
    return this._http.post(this.baseUrl + '/api/login', body, this.options)
      .map((res: Response) => {
        return res.json();
      });
  }

  logout() {
    this.options.withCredentials = true;
    return this._http.post(this.baseUrl + '/api/logout', '', this.options)
      .map((res: Response) => {
        const data = res;
      });
  }

  register(username: String, password: String) {
    this.options.withCredentials = true;
    const user = {
      username: username,
      password: password
    };
    return this._http.post(this.baseUrl + '/api/register', user, this.options)
      .map((res: Response) => {
        const data = res.json();
        return data;
      });
  }

  loggedIn() {
    this.options.withCredentials = true;
    return this._http.post(this.baseUrl + '/api/loggedIn', '', this.options)
      .map((res: Response) => {
        const user = res.json();
        if (user !== 0) {
          this.sharedService.user = user;
          return true;
        } else {
          this.router.navigate(['/login']);
          return false;
        }
      });
  }

  createUser(user: any) {
    const url = this.baseUrl + '/api/user/';
    return this._http.post(url, user)
      .map((response: Response) => {
        return response.json();
      });
  }

  findUserById(userId: string) {
    const url = this.baseUrl + '/api/user/' + userId;
    return this._http.get(url)
      .map((response: Response) => {
        return response.json();
      });
  }

  findUserByUsername(username: string) {
    const url = this.baseUrl + '/api/user?username=' + username;
    return this._http.get(url)
      .map((response: Response) => {
        return response.json();
      });
  }

  updateUser(userId, user) {
    user.id = userId;
    const url = this.baseUrl + '/api/user/' + userId;
    return this._http.put(url, user)
      .map((response: Response) => {
        return response.json();
      });
  }

  deleteUser(userId) {
    const url = this.baseUrl + '/api/user/' + userId;
    return this._http.delete(url)
      .map((response: Response) => {
        return response.json();
      });
  }

  findUserByCredentials(username, password) {
    const url = this.baseUrl + '/api/user?username=' + username + '&password=' + password;
    return this._http.get(url)
      .map((response: Response) => {
        return response.json();
      });
  }

  deleteAllUsers() {
    const url = this.baseUrl + '/api/deleteAllUsers';
    return this._http.delete(url)
      .map((response: Response) => {
      return response.status;
      });
  }
}
