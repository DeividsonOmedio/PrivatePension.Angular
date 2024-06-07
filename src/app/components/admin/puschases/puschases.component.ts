import { Component, OnInit } from '@angular/core';
import { IPurchase } from '../../../models/purchase';
import { PurchaseApiService } from '../../../services/purchase-api.service';
import { DatePipe, NgIf } from '@angular/common';
import { IPurchaseDto } from '../../../dtos/purchaseDto';

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

  PurschaseAprovedList: IPurchase[] = []; 
  PurschaseAprovedListDto: IPurchaseDto[] = []; 

  constructor(private apiPuchasesService: PurchaseApiService) {}

  ngOnInit(): void {
    this.apiPuchasesService.purchasesAprovedList$.subscribe((puchasesAprovedList) => {
      this.PurschaseAprovedList = puchasesAprovedList;
      console.log(puchasesAprovedList);
      this.apiPuchasesService.converter(this.PurschaseAprovedList).then((approvals) => {
        this.PurschaseAprovedListDto = approvals;
        console.log(this.PurschaseAprovedListDto);
        });
          });
  }



}
