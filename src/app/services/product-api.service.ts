import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IProduct } from '../models/product';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductApiService {
  private readonly API_URL_PRODUCTS = 'http://localhost:5041/api/Product';
  private productsSubject = new BehaviorSubject<IProduct[]>([]);
  public productsList$ = this.productsSubject.asObservable();
  private token: string | null;

  constructor(private http: HttpClient) {
    this.token = sessionStorage.getItem('token');
    this.getAllProducts();
  }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });
  }

  getAllProducts() {
    const headers = this.getHeaders();
    this.http.get<IProduct[]>(this.API_URL_PRODUCTS, { headers }).subscribe(
      (products: IProduct[]) => {
        this.productsSubject.next(products);
      },
      error => {
        console.error('Error fetching products', error);
      }
    );
  }
}
