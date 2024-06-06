import { Component, OnInit } from '@angular/core';
import { IPurchase } from '../../../models/purchase';
import { PurchaseApiService } from '../../../services/purchase-api.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-approvals',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './approvals.component.html',
  styleUrl: './approvals.component.css'
})
export class ApprovalsComponent implements OnInit {

  InAprrovals: IPurchase[] = [];

  constructor(private apiPurchaseService: PurchaseApiService) {}

  ngOnInit(): void {
    this.apiPurchaseService.Initialize();
    this.apiPurchaseService.inApprovalsList$.subscribe((inAprrovals) => {
      this.InAprrovals = inAprrovals;
      console.log(inAprrovals);
    });
  }
  Approve(id: number | undefined) {
    if (!id) 
      return;

    this.apiPurchaseService.approvePurchase(id);
  }
}
