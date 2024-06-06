import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule  } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IUser } from '../../../models/user';
import { UserApiService } from '../../../services/user-api.service';

@Component({
  selector: 'app-create-client',
  standalone: true,
  imports: [ReactiveFormsModule ],
  templateUrl: './create-client.component.html',
  styleUrl: './create-client.component.css'
})
export class CreateClientComponent implements OnInit{
  userForm: FormGroup;
  user?: IUser;
  userId?: number;
  constructor(private route: ActivatedRoute, private routes: Router, private userApiService: UserApiService) {
    this.userId = this.route.snapshot.params['id'];
    this.userForm = new FormGroup({
      userName: new FormControl(),
      email: new FormControl(),
      password: new FormControl(),
      role: new FormControl(),
      walletBalance: new FormControl()
    });
  }
  ngOnInit(): void {
    if(this.userId) { 
      this.userApiService.getUserById(this.userId).subscribe((user: IUser) => {
        console.log(user);
        this.user = user;
        this.userForm.patchValue(user);
        this.userForm.get('walletBalance')?.disable();
        this.userForm.get('role')?.disable();
        const divWalletBalance = document.getElementById('divWalletBalance');
        if (divWalletBalance && user.role !== 0)
          divWalletBalance.style.display = 'none';
      });
    }
    }
  submitForm() {
    console.log(this.userForm.value);
    this.userForm.value.role = this.userForm.value.role === '0' ? 0 : 1;
    if(this.userForm.valid) {
      if(this.userId) {
        this.userApiService.updateUser({...this.user, ...this.userForm.value});
         } else {
        this.userApiService.addUser(this.userForm.value);
      }
      this.routes.navigate(['/admin/clients']);
    }
  }
}
