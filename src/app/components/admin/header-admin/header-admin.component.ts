import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-admin',
  standalone: true,
  imports: [],
  templateUrl: './header-admin.component.html',
  styleUrl: './header-admin.component.css'
})
export class HeaderAdminComponent {
  constructor(private router: Router) { }

  clients() {
    this.router.navigate(['/admin/clients']);
  }

  products() {
    this.router.navigate(['/admin/products']);
  }

  dashboard() {
    this.router.navigate(['/admin/dashboard']);
  }
}
