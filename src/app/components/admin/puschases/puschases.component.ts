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
  styleUrls: ['./puschases.component.css']
})
export class PuschasesComponent implements OnInit {
  PurschaseAprovedList: IPurchase[] = []; 
  PurschaseAprovedListDto: IPurchaseDto[] = []; 

  constructor(private apiPuchasesService: PurchaseApiService) {}

  ngOnInit(): void {
    this.apiPuchasesService.purchasesAprovedList$.subscribe((puchasesAprovedList) => {
      this.PurschaseAprovedList = puchasesAprovedList;
      console.log(puchasesAprovedList);
      this.updatePurchaseApprovedListDto();
    });
  }

  private updatePurchaseApprovedListDto(): void {
    this.apiPuchasesService.converter(this.PurschaseAprovedList).then((approvals) => {
      const uniqueApprovals = approvals.filter((approval, index, self) =>
        index === self.findIndex((t) => t.id === approval.id && t.isApproved)
      );
      this.PurschaseAprovedListDto = uniqueApprovals;
      console.log(this.PurschaseAprovedListDto);
    });
  }

  Approve(purchaseId: number) {
    throw new Error('Method not implemented.');
  }
}
