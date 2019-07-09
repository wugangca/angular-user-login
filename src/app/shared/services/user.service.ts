import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  login(user: User): Observable<User> {
    return this.http.post<User>(environment.serviceRootUrl + '/users/login', user);
  }

  register(user: User): Observable<User> {
    return this.http.post<User>(environment.serviceRootUrl + '/users/register', user);
  }

  resetPassword(user: User): Observable<User> {
    return this.http.post<User>(environment.serviceRootUrl + '/users/reset', user);
  }

  changePassword(user: User): Observable<User> {
    return this.http.post<User>(environment.serviceRootUrl + '/users/changepwd', user);
  }

  setSession(user: User) {
    const productName = environment.productName;
    sessionStorage.setItem(productName + '-username', user.username);
    sessionStorage.setItem(productName + '-firstName', user.firstName);
    sessionStorage.setItem(productName + '-email', user.email);
    sessionStorage.setItem(productName + '-token', btoa(user.username + ':' + user.firstName));
  }

  clearSession() {
    const productName = environment.productName;
    sessionStorage.setItem(productName + '-username', '');
    sessionStorage.setItem(productName + '-firstName', '');
    sessionStorage.setItem(productName + '-email', '');
    sessionStorage.setItem(productName + '-token', '');
  }

  hasSessionToken() {
    const productName = environment.productName;
    const token = sessionStorage.getItem(productName + '-token');
    if (token === null || token === '') {
      return false;
    } else {
      return true;
    }
  }

  getUserEmail() {
    return sessionStorage.getItem(environment.productName + '-email');
  }

  getUserName() {
    return sessionStorage.getItem(environment.productName + '-username');
  }
}
