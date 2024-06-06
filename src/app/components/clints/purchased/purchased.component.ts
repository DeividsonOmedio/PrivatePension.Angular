import { Component, OnInit } from '@angular/core';
import { IPurchase } from '../../../models/purchase';
import { PurchaseApiService } from '../../../services/purchase-api.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-purchased',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './purchased.component.html',
  styleUrl: './purchased.component.css'
})
export class PurchasedComponent implements OnInit{
  purchasedList: IPurchase[] = [];
  
  constructor(private purchaseApiService: PurchaseApiService) {}
  ngOnInit(): void {
    this.purchaseApiService.Initialize();
    this.purchaseApiService.purchasedsList$.subscribe((purchasedsList) => {
      this.purchasedList = purchasedsList;
      console.log(purchasedsList);   
    });
  }
  
  calcel() {
    throw new Error('Method not implemented.');
  }
  contribution() {
    throw new Error('Method not implemented.');
  }
  CancelPurchase(id: number | undefined) {
    console.log('Cancel purchase');
    console.log(id);
    if (id) {
      this.purchaseApiService.deletePurchase(id);
    }
  }
}
