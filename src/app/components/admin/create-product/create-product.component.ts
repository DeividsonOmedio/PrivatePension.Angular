import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule  } from '@angular/forms';
import { IProduct } from '../../../models/product';
import { ProductApiService } from '../../../services/product-api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create-product',
  standalone: true,
  imports: [ReactiveFormsModule ],
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.css'
})
export class CreateProductComponent implements OnInit{
  productForm: FormGroup;
  product?: IProduct;
  productId: number;
  btnSubmit: string = 'Cadastrar';
  constructor(private apiProduvtService: ProductApiService, private route: ActivatedRoute, private routes: Router) {
    this.productId = this.route.snapshot.params['id'];
    this.productForm = new FormGroup({
      name: new FormControl(this.product?.name),
      price: new FormControl(this.product?.price),
      description: new FormControl(this.product?.description),
      available: new FormControl(this.product?.available),
    });
  }
  ngOnInit(): void {
    this.apiProduvtService.getProductById(this.productId).subscribe((product) => {
      this.product = product;
      this.productForm.patchValue(product);
      this.btnSubmit = 'Atualizar';
    });
  }
  submitForm() {
    this.productForm.value.available = this.productForm.value.available === 'true' ? true : false;
    if (this.product) {
      const response = this.apiProduvtService.updateProduct({ ...this.product, ...this.productForm.value });
    } else {
    console.log(this.productForm.value);
    this.apiProduvtService.addProduct(this.productForm.value);
  }
  this.routes.navigate(['/admin/products']);
}
}