import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IPurchase } from '../models/purchase';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';
import { API_URLS, appConfig } from '../app.config'; 
import { ProductApiService } from './product-api.service';

@Injectable({
  providedIn: 'root'
})
export class PurchaseApiService {

  private token: string | null = null;
  private readonly API_URL_PURCHASE = API_URLS.PURCHASE_API;
  
  private purchasesAprovedSubject = new BehaviorSubject<IPurchase[]>([]);
  public purchasesAprovedList$ = this.purchasesAprovedSubject.asObservable();
 
  private purchasedsSubject = new BehaviorSubject<IPurchase[]>([]);
  public purchasedsList$ = this.purchasedsSubject.asObservable();

  private inApprovalsSubject = new BehaviorSubject<IPurchase[]>([]);
  public inApprovalsList$ = this.inApprovalsSubject.asObservable();


  constructor(private http: HttpClient) {
    this.Initialize();
  }

  Initialize(){
    this.token = sessionStorage.getItem('token');
    if (this.token) { 
      const token = this.decodeToken(this.token);
      console.log(token); 
      if (token.role === 'admin'){
        this.getAprovedPurchase();
        this.getInApprovals();
      } else if(token.role === 'client') {
        this.getPurchaseByClient(token.nameid);
      }
    }
  }
  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });
  }

  getAprovedPurchase() {
    const headers = this.getHeaders();
    this.http.get<IPurchase[]>(`${this.API_URL_PURCHASE}/GetByApproved/isApproved`, { headers }).subscribe(
      (purchases: IPurchase[]) => {
        this.purchasesAprovedSubject.next(purchases);
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

  getPurchaseById(purchaseId: number) {
    const headers = this.getHeaders();
    return this.http.get<IPurchase>(`${this.API_URL_PURCHASE}/${purchaseId}`, { headers });
  }
 
  getPurchaseByClient(purchaseId: number) {
    const headers = this.getHeaders();
    this.http.get<IPurchase[]>(`${this.API_URL_PURCHASE}/GetByClient/${purchaseId}`, { headers }).subscribe(
      (purchase: IPurchase[]) => {
        this.purchasedsSubject.next(purchase);
      },
      error => {
        console.error('Error fetching purchase by client', error);
      }
    );
  }

  toApprovePurchase(purchaseId: number) {
    const headers = this.getHeaders();
    this.http.put(`${this.API_URL_PURCHASE}/Approve/${purchaseId}`, {}, { headers }).subscribe(
      () => {
        this.Initialize();
      },
      error => {
        console.error('Error approving purchase', error);
      }
    );
  }

  addPurchase(purchase: IPurchase)  {
    const headers = this.getHeaders();
    return this.http.post<any>(this.API_URL_PURCHASE, purchase, { headers })
    
  }

  approvePurchase(id: number) {
    const headers = this.getHeaders();
    this.http.patch(`${API_URLS.URL}/approve/${id}`, {}, { headers }).subscribe(
      () => {
        this.Initialize();
      },
      error => {
        console.error('Error updating purchase', error);
      }
    );
  }

  updatePurchase(purchase: IPurchase) {
    const headers = this.getHeaders();
    this.http.put(`${this.API_URL_PURCHASE}/${purchase.id}`, purchase, { headers }).subscribe(
      () => {
        this.Initialize();
      },
      error => {
        console.error('Error updating purchase', error);
      }
    );
  }

  deletePurchase(purchaseId: number) {
    const headers = this.getHeaders();
    this.http.delete(`${this.API_URL_PURCHASE}/${purchaseId}`, { headers }).subscribe(
      () => {
        // this.prodctApiService.forSalesList$;
        this.Initialize();
      },
      error => {
        console.error('Error deleting purchase', error);
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
