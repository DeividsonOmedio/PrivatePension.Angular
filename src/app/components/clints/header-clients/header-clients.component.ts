import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-clients',
  standalone: true,
  imports: [],
  templateUrl: './header-clients.component.html',
  styleUrl: './header-clients.component.css'
})
export class HeaderClientsComponent {
  constructor(private router: Router) { }
  purchased() {
    this.router.navigate(['/client/purchased']);
  }
  home() {
    this.router.navigate(['/client/forsale']);
  }

}
