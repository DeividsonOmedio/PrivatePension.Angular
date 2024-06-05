import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { IProduct } from '../models/product';
import { IUser } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {

  private readonly API_URL_USER = 'http://localhost:5041/api/User';
  private usersSubject = new BehaviorSubject<IUser[]>([]);
  public usersList$ = this.usersSubject.asObservable();
  private token: string | null;

  constructor(private http: HttpClient) {
    this.token = sessionStorage.getItem('token');
    this.getAllUsers();
  }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });
  }

  getAllUsers() {
    const headers = this.getHeaders();
    this.http.get<IUser[]>(this.API_URL_USER, { headers }).subscribe((users: IUser[]) => {
      this.usersSubject.next(users);
    });
  }

  getAdmins(): Observable<IUser[]> {
    return this.usersList$.pipe(
      map(users => users.filter(user => user.role === 1))
    );
  }

  getClients(): Observable<IUser[]> {
    return this.usersList$.pipe(
      map(users => users.filter(user => user.role === 0))
    );
}
}