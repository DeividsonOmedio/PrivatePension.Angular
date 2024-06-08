import { Component, OnInit } from '@angular/core';
import { IPurchase } from '../../../models/purchase';
import { PurchaseApiService } from '../../../services/purchase-api.service';
import { DatePipe } from '@angular/common';
import { IPurchaseDto } from '../../../dtos/purchaseDto';

@Component({
  selector: 'app-approvals',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './approvals.component.html',
  styleUrls: ['./approvals.component.css']
})
export class ApprovalsComponent implements OnInit {

  InApprovals: IPurchase[] = [];
  InApprovalsDto: IPurchaseDto[] = [];

  constructor(private apiPurchaseService: PurchaseApiService) {}

  ngOnInit(): void {
    this.apiPurchaseService.Initialize();
    this.apiPurchaseService.inApprovalsList$.subscribe((inApprovals) => {
      this.InApprovals = inApprovals;
      this.updateInApprovalsDto();
    });
  }

  private updateInApprovalsDto(): void {
    this.apiPurchaseService.converter(this.InApprovals).then((approvals) => {
      const uniqueApprovals = approvals.filter((approval, index, self) =>
        index === self.findIndex((t) => t.id === approval.id && !t.isApproved)
      );
      this.InApprovalsDto = uniqueApprovals;
    });
  }

  Approve(id: number | undefined) {
    if (!id) 
      return;

    this.apiPurchaseService.approvePurchase(id);
  }
}
