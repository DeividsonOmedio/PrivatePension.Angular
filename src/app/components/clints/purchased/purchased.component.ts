import { Component, OnInit } from '@angular/core';
import { IPurchase } from '../../../models/purchase';
import { PurchaseApiService } from '../../../services/purchase-api.service';
import { DatePipe, NgIf } from '@angular/common';
import { ModalComponent } from '../../shared/modal/modal.component';
import { ContributionApiService } from '../../../services/contribution-api.service';
import { IContribution } from '../../../models/contribution';
import { IContributionDtos } from '../../../dtos/contributionDto';
import { IPurchaseDto } from '../../../dtos/purchaseDto';
import { Router } from '@angular/router';

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

  constructor(private purchaseApiService: PurchaseApiService, private contributionApiService: ContributionApiService, private router: Router) {}

  ngOnInit(): void {
    this.purchasedListDto = [];
    this.purchaseApiService.purchasedsList$.subscribe(async (purchasedsList) => {
      for (const purchase of purchasedsList) {
        this.purchaseApiService.ProductsListPurchasedList$.subscribe(
          async (ProductsListPurchased) => {
            console.log(ProductsListPurchased);
          console.log(ProductsListPurchased);
  
          const purchaseDto = await this.purchaseApiService.converterSingleProduct(purchase, ProductsListPurchased);
        if (purchaseDto) {
          this.purchasedListDto.push(purchaseDto);
          }

          })
        console.log(this.purchasedListDto);
            }})


      
      
    this.contributionApiService.contribuitionsListByUser$.subscribe((contribuitionsList) => {
      this.contributionsList = contribuitionsList;
      this.contributionsListDto = this.contributionApiService.converter(this.contributionsList);
      console.log(this.contributionsListDto);
    });
  }

  CancelPurchase(id: number | undefined) {
    if (id) {
      this.purchaseApiService.deletePurchase(id);
      this.reloadComponent();
    }
  }

  ContributionInPurchase(idPurchase: number | undefined) {
    if (idPurchase) {
      this.IdPurchase = idPurchase;
    }
  }

  onAmountChange(amount: number) {
    this.amount = amount;
    console.log('Amount changed:', this.amount);
    const contribution: IContribution = {
      amount: this.amount,
      contributionDate: new Date().toISOString(),
      purchaseId: this.IdPurchase
    };
    this.contributionApiService.addContribuition(contribution);
  }

  reloadComponent(): void {
    this.router.navigate(['/client/purchased']);
    // this.router.navigateByUrl('/client/purchased', { skipLocationChange: true }).then(() => {
    //   this.router.navigate(['/client/purchased']);
    // });
    // this.router.navigateByUrl('/refresh', { skipLocationChange: true }).then(() => {
    //   this.router.navigate([this.router.url]);
    // });
    // this.ngOnInit();
  }
}
