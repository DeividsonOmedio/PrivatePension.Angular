import { Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginApiService } from '../../services/login-api.service';
import { IUser } from '../../models/user';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
admin() {
throw new Error('Method not implemented.');
}
  userForm: FormGroup;

  constructor(private router: Router, private loginService: LoginApiService) { 
    sessionStorage.removeItem('token');
    this.userForm = new FormGroup({
      email: new FormControl(),
      password: new FormControl(),
      
    });
  }

  submitForm() {
    const user: IUser = this.userForm.value;
    console.log(user);

    this.loginService.login(user).subscribe(
      res => {
        console.log('Login successful', res);
        const decodedToken = this.loginService.decodeToken(res.token);
        console.log('Decoded token:', decodedToken);
        decodedToken.role === 'admin' ? this.router.navigate(['/admin']) : this.router.navigate(['/client']);
      },
      error => {
        console.error('Login failed', error);
        alert('User not found');
      }
    );
  }
}
