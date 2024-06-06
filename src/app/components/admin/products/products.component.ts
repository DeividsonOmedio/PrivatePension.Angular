import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IProduct } from '../../../models/product';
import { Router, RouterModule } from '@angular/router';
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
  product: IProduct | undefined;
  constructor(private apiProductService: ProductApiService, private route: Router) {}

  ngOnInit(): void {
    this.apiProductService.Initialize();
    this.apiProductService.productsList$.subscribe((productsList) => {
      this.productsList = productsList;
      console.log(productsList);
    });
  }

  Delete() {
    console.log("delete")
    throw new Error('Method not implemented.');
  }

  Edit(id: number | undefined) {
    if (id)
      this.route.navigate(['/admin/manageproduct/edit', id]);      
  }
}
