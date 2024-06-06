import { Injectable } from '@angular/core';
import { IUser } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { API_URLS } from '../app.config'; 

@Injectable({
  providedIn: 'root'
})
export class LoginApiService {
  private API_URL = API_URLS.LOGIN_API;
  token: string = '';

  constructor(private http: HttpClient) {}

  login(user: IUser): Observable<any> {
    return this.http.post<any>(this.API_URL, user).pipe(
      tap(res => {
        this.token = res.token;
        sessionStorage.removeItem('token');
        sessionStorage.setItem('token', this.token);
        console.log('Decoded token:', this.decodeToken(this.token));
      })
    );
  }

  decodeToken(token: string): any {
    try {
      return jwtDecode(token);
    } catch (Error) {
      console.error('Error decoding token:', Error);
      return null;
    }
  }
}
