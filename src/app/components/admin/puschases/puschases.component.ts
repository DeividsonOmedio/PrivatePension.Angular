import { Component, OnInit } from '@angular/core';
import { IPurchase } from '../../../models/purchase';
import { PurchaseApiService } from '../../../services/purchase-api.service';
import { DatePipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-puschases',
  standalone: true,
  imports: [NgIf, DatePipe],
  templateUrl: './puschases.component.html',
  styleUrl: './puschases.component.css'
})
export class PuschasesComponent implements OnInit {
Approve() {
throw new Error('Method not implemented.');
}

  PurschaseList: IPurchase[] = []; 

  constructor(private apiPuchasesService: PurchaseApiService) {}

  ngOnInit(): void {
    this.apiPuchasesService.purchasesList$.subscribe((puchasesList) => {
      this.PurschaseList = puchasesList;
      console.log(puchasesList);
    });
  }



}
