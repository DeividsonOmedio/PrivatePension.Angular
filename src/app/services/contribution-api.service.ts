import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IPurchase } from '../models/purchase';
import { IContribution } from '../models/contribution';

@Injectable({
  providedIn: 'root'
})
export class ContributionApiService {

  private token: string | null;
  private readonly API_URL_PURCHASE = 'http://localhost:5041/api/Contribution';
  
  private contribuitionsSubject = new BehaviorSubject<IContribution[]>([]);
  public contribuitionsList$ = this.contribuitionsSubject.asObservable();

  constructor(private http: HttpClient) {
    this.token = sessionStorage.getItem('token');
    this.updateToken();
    this.getAllContribuitions();
  }

  private updateToken() {
    this.token = sessionStorage.getItem('token');
  }

  private getHeaders(): HttpHeaders {
    console.log(this.token);
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });
  }

  getAllContribuitions() {
    const headers = this.getHeaders();
    this.http.get<IContribution[]>(this.API_URL_PURCHASE, { headers }).subscribe(
      (contribuitions: IContribution[]) => {
        console.log(contribuitions);
        this.contribuitionsSubject.next(contribuitions);
      },
      error => {
        console.error('Error fetching products', error);
      }
    );
  }

  getContribuitionById(contribuitionId: number) {
    const headers = this.getHeaders();
    return this.http.get<IContribution>(`${this.API_URL_PURCHASE}/${contribuitionId}`, { headers });
  }

  addContribuition(contribuition: IContribution) {
    const headers = this.getHeaders();
    return this.http.post<IContribution>(this.API_URL_PURCHASE, contribuition, { headers }).subscribe(
      () => {
        this.getAllContribuitions();
      },
      error => {
        console.error('Error fetching products', error);
      }
    );

  }
}

