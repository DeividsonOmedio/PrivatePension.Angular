import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule  } from '@angular/forms';

@Component({
  selector: 'app-create-product',
  standalone: true,
  imports: [ReactiveFormsModule ],
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.css'
})
export class CreateProductComponent {
  productForm: FormGroup;
  
  constructor() {
    this.productForm = new FormGroup({
      name: new FormControl(),
      price: new FormControl(),
      description: new FormControl(),
      avaliable: new FormControl(),
    });
  }
  submitForm() {
  throw new Error('Method not implemented.');
  }
}
