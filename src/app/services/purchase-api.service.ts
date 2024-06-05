import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IPurchase } from '../models/purchase';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PurchaseApiService {

  private token: string | null;
  private readonly API_URL_PURCHASE = 'http://localhost:5041/api/Purchase';
  
  private purchasesSubject = new BehaviorSubject<IPurchase[]>([]);
  public purchasesList$ = this.purchasesSubject.asObservable();

  private inApprovalsSubject = new BehaviorSubject<IPurchase[]>([]);
  public inApprovalsList$ = this.inApprovalsSubject.asObservable();

  constructor(private http: HttpClient) {
    this.token = sessionStorage.getItem('token');
    this.getAllPurchase();
    this.getInApprovals();
  }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });
  }

  getAllPurchase() {
    const headers = this.getHeaders();
    this.http.get<IPurchase[]>(this.API_URL_PURCHASE, { headers }).subscribe(
      (purchases: IPurchase[]) => {
        this.purchasesSubject.next(purchases);
      },
      error => {
        console.error('Error fetching products', error);
      }
    );
  }
  getInApprovals() {
    const headers = this.getHeaders();
    this.http.get<IPurchase[]>(`${this.API_URL_PURCHASE}/GetByApproved/notApproved/`, { headers }).subscribe(
      (inApprovals: IPurchase[]) => {
        console.log(inApprovals);
        this.inApprovalsSubject.next(inApprovals);
      },
      error => {
        console.error('Error fetching in approvals', error);
      }
    );
  }
}
