import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { IProduct } from '../models/product';
import { IUser } from '../models/user';
import { jwtDecode } from 'jwt-decode';

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

  getClietToken() {
    if (this.token) {
      const res = this.decodeToken(this.token);
      return res.nameid;
    }

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

  getUserById(userId: number): Observable<IUser> {
    const headers = this.getHeaders();
    return this.http.get<IUser>(`${this.API_URL_USER}/${userId}`, { headers });
  }

  addUser(user: IUser){
    const headers = this.getHeaders();
    return this.http.post<IUser>(this.API_URL_USER, user, { headers }).subscribe(
      () => {
        this.getAllUsers();
      },
      error => {
        console.error('Error adding user', error);
      }
    );

    
  }

  updateUser(user: IUser) {
    const headers = this.getHeaders();
    return this.http.put<IUser>(`${this.API_URL_USER}/${user.id}`, user, { headers }).subscribe(
      () => {
        this.getAllUsers();
      },
      error => {
        console.error('Error updating user', error);
      }
    );
  }

  deleteUser(userId: number){
    const headers = this.getHeaders();
    return this.http.delete<IUser>(`${this.API_URL_USER}/${userId}`, { headers }).subscribe(
      () => {
        this.getAllUsers();
      },
      error => {
        console.error('Error deleting user', error);
      }
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