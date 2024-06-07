import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IPurchase } from '../models/purchase';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';
import { API_URLS } from '../app.config'; 
import { ProductApiService } from './product-api.service';
import { IPurchaseDto } from '../dtos/purchaseDto';
import { UserApiService } from './user-api.service';
import { IProduct } from '../models/product';

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
  
  private ProductsListPurchasedSubject = new BehaviorSubject<IProduct[]>([]);
  public ProductsListPurchasedList$ = this.ProductsListPurchasedSubject.asObservable();

  Approvals: IPurchaseDto[] = [];
  ProductsListPurchased: IProduct[] = [];

  constructor(private http: HttpClient, private userApiService: UserApiService, private productApiService: ProductApiService) {
    this.Initialize();
  }

  Initialize(){
    this.token = sessionStorage.getItem('token');
    if (this.token) { 
      const token = this.decodeToken(this.token);
      console.log(token.role); 
      if (token.role === 'admin'){
        this.getInApprovals();
        this.getAprovedPurchase();
      } else if(token.role === 'client') {
        this.getPurchaseByClient(token.nameid);
        this.getProductsPhurchasedByUser(token.nameid);
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
    return this.http.post<any>(this.API_URL_PURCHASE, purchase, { headers });
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
        // this.Initialize();
      },
      error => {
        console.error('Error deleting purchase', error);
      }
    );
  }

  converter(purchasedList: IPurchase[], userName: string | null = null): Promise<IPurchaseDto[]> {
    if (userName === 'user')
    this.Approvals = [];
  
  const promises = purchasedList.map(async (purchased) => {
    if (!purchased.id) return;
  let purchaseDto: IPurchaseDto = {
    id: purchased.id,
  clientName: '',
          productName: '',
          purchaseDate: purchased.purchaseDate,
          isApproved: purchased.isApproved
        };
    
        if (userName === 'user') {
          const products = await this.productApiService.getProductsPhurchasedByUser(purchased.productId).toPromise();
          if (!products) return;
          const product = products.find(product => product.id === purchased.productId);
          if (product) {
            purchaseDto.productName = product.name;
            console.log(product.id, purchased.productId);
          }
        } else {
          const user = await this.userApiService.getUserById(purchased.id).toPromise();
          if (!user) return;
          purchaseDto.clientName = user.userName;
          const productName = await this.productApiService.getProductById(purchased.productId).toPromise();
          if (!productName) return;
          purchaseDto.productName = productName.name;
          console.log(purchaseDto);
        }
    
        this.Approvals.push(purchaseDto);
      });
    
    return Promise.all(promises).then(() => this.Approvals);
    }
   
  

  async converterSingleProduct(purchased: IPurchase, purchasedListUser: IProduct[]): Promise<IPurchaseDto | null> {
    if (!purchased.id) return null;
    console.log(purchased);
    let purchaseDto: IPurchaseDto = {
      id: purchased.id,
      clientName: '',
      productName: '',
      purchaseDate: purchased.purchaseDate,
      isApproved: purchased.isApproved
    };

    console.log(purchased.productId);
    console.log(purchasedListUser);
    purchasedListUser.forEach(product => {
      if (product.id === purchased.productId) {
        purchaseDto.productName = product.name;
        console.log(product.id, purchased.productId);
      }
    });

    return purchaseDto;
  }

  getProductsPhurchasedByUser(userId: number) {
    this.productApiService.getProductsPhurchasedByUser(userId).subscribe(
      (products: IProduct[]) => {
        this.ProductsListPurchased = products;
        this.ProductsListPurchasedSubject.next(products);
        console.log(this.ProductsListPurchasedList$);
      },
      error => {
        console.error('Error fetching products', error);
      }
    );
    return this.ProductsListPurchased;
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
