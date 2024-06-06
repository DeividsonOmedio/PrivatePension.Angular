import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IProduct } from '../models/product';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class ProductApiService {
  private readonly API_URL_PRODUCTS = 'http://localhost:5041/api/Product';
  private productsSubject = new BehaviorSubject<IProduct[]>([]);
  public productsList$ = this.productsSubject.asObservable();

  private forSalesSubject = new BehaviorSubject<IProduct[]>([]);
  public forSalesList$ = this.forSalesSubject.asObservable();

  private token: string | null;

  constructor(private http: HttpClient) {
    this.token = sessionStorage.getItem('token');
    //this.getAllProducts();
    this.token = sessionStorage.getItem('token');
    if (this.token){
      const token = this.decodeToken(this.token);
      console.log(token.nameid);
      this.getProductsForSale(token.nameid);
    }
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

  getProductsForSale(id: number) {
    const headers = this.getHeaders();
    this.http.get<IProduct[]>(`${this.API_URL_PRODUCTS}/GetProductsPurchasedByUser?userId=${id}`, { headers }).subscribe(
      (products: IProduct[]) => {
        this.forSalesSubject.next(products);
      },
      error => {
        console.error('Error fetching products for sale', error);
      }
    );
  }

  getProductById(productId: number) {
    const headers = this.getHeaders();
    return this.http.get<IProduct>(`${this.API_URL_PRODUCTS}/${productId}`, { headers });
  }

  addProduct(product: IProduct) {
    const headers = this.getHeaders();
    return this.http.post<IProduct>(this.API_URL_PRODUCTS, product, { headers });
  }

  updateProduct(product: IProduct) {
    const headers = this.getHeaders();
    return this.http.put<IProduct>(`${this.API_URL_PRODUCTS}/${product.id}`, product, { headers }).subscribe(
      () => {
        this.getAllProducts();
      },
      error => {
        console.error('Error updating product', error);
      }
    );
  }

  deleteProduct(productId: number) {
    const headers = this.getHeaders();
    return this.http.delete<IProduct>(`${this.API_URL_PRODUCTS}/${productId}`, { headers });
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
