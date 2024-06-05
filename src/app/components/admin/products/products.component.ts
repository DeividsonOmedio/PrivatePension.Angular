import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IProduct } from '../../../models/product';
import { RouterModule } from '@angular/router';
import { ProductApiService } from '../../../services/product-api.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']  // Corrigido de 'styleUrl' para 'styleUrls'
})
export class ProductsComponent implements OnInit {

  productsList: IProduct[] = [];

  constructor(private apiProductService: ProductApiService) {}

  ngOnInit(): void {
    this.apiProductService.productsList$.subscribe((productsList) => {
      this.productsList = productsList;
      console.log(productsList);
    });
  }

  Delete() {
    throw new Error('Method not implemented.');
  }

  Edite() {
    throw new Error('Method not implemented.');
  }
}
