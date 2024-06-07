import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reload',
  standalone: true,
  imports: [],
  templateUrl: './reload.component.html',
  styleUrl: './reload.component.css'
})
export class ReloadComponent implements OnInit{
  constructor(private router: Router) {
  }
  ngOnInit(): void {
    this.router.navigate(['/client/purchased']);
  }
}
