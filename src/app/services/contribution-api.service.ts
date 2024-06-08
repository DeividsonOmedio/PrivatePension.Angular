import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IContribution } from '../models/contribution';
import { API_URLS } from '../app.config'; 
import { IContributionDtos } from '../dtos/contributionDto';
import { ProductApiService } from './product-api.service';
import { PurchaseApiService } from './purchase-api.service';
import { UserApiService } from './user-api.service';

@Injectable({
  providedIn: 'root'
})
export class ContributionApiService {

  private token: string | null;
  private readonly API_URL_PURCHASE = API_URLS.CONTRIBUTION_API;
  
  private contribuitionsSubject = new BehaviorSubject<IContribution[]>([]);
  public contribuitionsList$ = this.contribuitionsSubject.asObservable();
 
  private contribuitionsByUserSubject = new BehaviorSubject<IContribution[]>([]);
  public contribuitionsListByUser$ = this.contribuitionsByUserSubject.asObservable();

  contributions: IContributionDtos[] = [];


  constructor(private http: HttpClient, private userApiService: UserApiService, private productApiService: ProductApiService, private purchaseApiService: PurchaseApiService) {
    this.token = sessionStorage.getItem('token');
    if(this.token){
      this.Initialize()
    }
    else{
      this.updateToken();
    }
  }
  Initialize(){
    const token = this.decoteToken(this.token);
    if (token.role === 'admin'){ 
      this.getAllContribuitions();
    } else if(token.role === 'client') {
      this.getContribuitionByUser(token.nameid);
    }
  }
  private updateToken() {
    this.token = sessionStorage.getItem('token');
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
        (contribuitions);
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

  getContribuitionByUser(userId: number) {
    const headers = this.getHeaders();
    this.http.get<IContribution[]>(`${this.API_URL_PURCHASE}/GetByUser/${userId}`, { headers }).subscribe(
      (contribuitions: IContribution[]) => {
        this.contribuitionsByUserSubject.next(contribuitions);
      },
      error => {
        console.error('Error fetching products', error);
      }
    );
  }

  addContribuition(contribuition: IContribution) {
    const headers = this.getHeaders();
    return this.http.post<IContribution>(this.API_URL_PURCHASE, contribuition, { headers }).subscribe(
      () => {
        this.Initialize();
      },
      err => {
        console.error('Error fetching products', err);
        console.error('Erro ao adicionar compra', err);
        if (err.error == "Insufficient funds")
          alert('Saldo insuficiente');
      }
    );

  }

  converter(contributions: IContribution[], username: string | null = null) {
    contributions.forEach((contribution) => {
      if (!contribution.id) return;
  
      let contributionDto: IContributionDtos = {
        id: contribution.id,
        clientName: '',
        productName: '',
        purchaseId: contribution.purchaseId,
        amount: contribution.amount,
        contributionDate: contribution.contributionDate
      };
      if (username) {
        contributionDto.clientName = username;
        
      } else {
        const purchase = this.purchaseApiService.getPurchaseById(contribution.purchaseId);
        purchase.subscribe((purchase) => {
          this.userApiService.getUserById(purchase.clientId).subscribe((user) => {
            contributionDto.clientName = user.userName;
            this.productApiService.getProductById(purchase.productId).subscribe((product) => {
              contributionDto.productName = product.name;
            });
          });
        });
      }
      this.contributions.push(contributionDto);
    });
  
    return this.contributions;
  }
  
  decoteToken(token: string | null) {
    if (token) {
      const tokenPayload = token.split('.')[1];
      const tokenPayloadDecoded = atob(tokenPayload);
      return JSON.parse(tokenPayloadDecoded);
    }
    return null;
  }
}

