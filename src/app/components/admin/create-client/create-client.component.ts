import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule  } from '@angular/forms';

@Component({
  selector: 'app-create-client',
  standalone: true,
  imports: [ReactiveFormsModule ],
  templateUrl: './create-client.component.html',
  styleUrl: './create-client.component.css'
})
export class CreateClientComponent {
  userForm: FormGroup;
  
  constructor() {
    this.userForm = new FormGroup({
      userName: new FormControl(),
      email: new FormControl(),
      password: new FormControl(),
      role: new FormControl(),
      WalletBalance: new FormControl()
    });
  }
  submitForm() {
  throw new Error('Method not implemented.');
  }
}
