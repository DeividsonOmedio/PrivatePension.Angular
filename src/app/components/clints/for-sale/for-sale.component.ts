import { Component } from '@angular/core';
import { IPurchase } from '../../../models/purchase';
import { IProduct } from '../../../models/product';

@Component({
  selector: 'app-for-sale',
  standalone: true,
  imports: [],
  templateUrl: './for-sale.component.html',
  styleUrl: './for-sale.component.css'
})
export class ForSaleComponent {
purchase() {
throw new Error('Method not implemented.');
}
 produstsForSale: IProduct[] = [];
}
