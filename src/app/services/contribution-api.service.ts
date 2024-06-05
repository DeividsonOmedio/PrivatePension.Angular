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
    this.getAllContribuitions();
  }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });
  }

  getAllContribuitions() {
    const headers = this.getHeaders();
    this.http.get<IContribution[]>(this.API_URL_PURCHASE, { headers }).subscribe(
      (contribuitions: IContribution[]) => {
        this.contribuitionsSubject.next(contribuitions);
      },
      error => {
        console.error('Error fetching products', error);
      }
    );
  }
}

