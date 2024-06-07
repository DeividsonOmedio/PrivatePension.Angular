import { Component, OnInit } from '@angular/core';
import { IPurchase } from '../../../models/purchase';
import { PurchaseApiService } from '../../../services/purchase-api.service';
import { DatePipe } from '@angular/common';
import { UserApiService } from '../../../services/user-api.service';
import { IPurchaseDto } from '../../../dtos/purchaseDto';

@Component({
  selector: 'app-approvals',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './approvals.component.html',
  styleUrl: './approvals.component.css'
})
export class ApprovalsComponent implements OnInit {

  InAprrovals: IPurchase[] = [];
  InAprrovalsDto: IPurchaseDto[] = [];

  constructor(private apiPurchaseService: PurchaseApiService ) {}

  ngOnInit(): void {
    this.apiPurchaseService.Initialize();
    this.apiPurchaseService.inApprovalsList$.subscribe((inAprrovals) => {
      this.InAprrovals = inAprrovals;
      console.log(inAprrovals);
      this.apiPurchaseService.converter(this.InAprrovals).then((approvals) => {
        this.InAprrovalsDto = approvals;
        console.log(this.InAprrovalsDto);
        });
    });
  }
  Approve(id: number | undefined) {
    if (!id) 
      return;

    this.apiPurchaseService.approvePurchase(id);
  }

 

}
