import { Component } from '@angular/core';
import { IPurchase } from '../../../models/purchase';

@Component({
  selector: 'app-purchased',
  standalone: true,
  imports: [],
  templateUrl: './purchased.component.html',
  styleUrl: './purchased.component.css'
})
export class PurchasedComponent {
  purchasedList: IPurchase[] = [];
  
  calcel() {
  throw new Error('Method not implemented.');
  }
  contribution() {
  throw new Error('Method not implemented.');
  }
}
