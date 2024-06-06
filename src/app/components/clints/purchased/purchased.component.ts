import { Component, OnInit } from '@angular/core';
import { IPurchase } from '../../../models/purchase';
import { PurchaseApiService } from '../../../services/purchase-api.service';
import { DatePipe, NgIf } from '@angular/common';
import { ModalComponent } from '../../shared/modal/modal.component';
import { ContributionApiService } from '../../../services/contribution-api.service';
import { IContribution } from '../../../models/contribution';
import { IContributionDtos } from '../../../dtos/contributionDto';
import { IPurchaseDto } from '../../../dtos/purchaseDto';

@Component({
  selector: 'app-purchased',
  standalone: true,
  imports: [DatePipe, ModalComponent, NgIf],
  templateUrl: './purchased.component.html',
  styleUrls: ['./purchased.component.css']
})
export class PurchasedComponent implements OnInit {
  purchasedList: IPurchase[] = [];
  purchasedListDto: IPurchaseDto[] = [];
  contributionsList: IContribution[] = [];
  contributionsListDto: IContributionDtos[] = [];
  userName: string = '';
  IdPurchase: number = 0;
  amount: number = 0;
  contador: number[] = [];
  num: number = 0;

  constructor(private purchaseApiService: PurchaseApiService, private contributionApiService: ContributionApiService) {}

  ngOnInit(): void {
    this.purchaseApiService.Initialize();
    this.purchaseApiService.purchasedsList$.subscribe((purchasedsList) => {
      this.purchasedList = purchasedsList;
      console.log(purchasedsList);
      this.purchasedListDto = this.purchaseApiService.converter(purchasedsList);
      console.log(this.contributionsListDto);
      });
      
      this.contributionApiService.contribuitionsListByUser$.subscribe((contribuitionsList) => {
        this.contributionsList = contribuitionsList;
        console.log(contribuitionsList);
        this.contributionsListDto = this.contributionApiService.converter(this.contributionsList);
    });
    }
  

  CancelPurchase(id: number | undefined) {
    console.log('Cancel purchase');
    console.log(id);
    if (id) {
      this.purchaseApiService.deletePurchase(id);
      }
    }
  
  ContributionInPurchase(idPurchase: number|undefined) {
    console.log('Contribution in purchase');
    console.log(idPurchase);
    if (idPurchase) {
      this.IdPurchase = idPurchase;
      }
  }
      
      onAmountChange(amount: number) {
        this.amount = amount;
        console.log('Amount changed:', this.amount);
        const contribution: IContribution = {
          amount: this.amount,
          contributionDate : new Date().toISOString(),
          purchaseId: this.IdPurchase
          };
        this.contributionApiService.addContribuition(contribution)
        
  }
}

