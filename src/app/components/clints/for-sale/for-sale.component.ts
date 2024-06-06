import { Component, OnInit } from '@angular/core';
import { IPurchase } from '../../../models/purchase';
import { IProduct } from '../../../models/product';
import { PurchaseApiService } from '../../../services/purchase-api.service';
import { ProductApiService } from '../../../services/product-api.service';
import { UserApiService } from '../../../services/user-api.service';

@Component({
  selector: 'app-for-sale',
  standalone: true,
  imports: [],
  templateUrl: './for-sale.component.html',
  styleUrl: './for-sale.component.css'
})
export class ForSaleComponent implements OnInit{
  produstsForSale: IProduct[] = [];
  

  constructor(private productApiService: ProductApiService, private purchaseApiService: PurchaseApiService, private userApiService: UserApiService) {}
  ngOnInit(): void {
    this.productApiService.forSalesList$.subscribe((forSalesList) => {
      this.produstsForSale = forSalesList;
      console.log(forSalesList);
    });
  }

  purchase(idItem: number | undefined) {
    console.log("idItem");
    console.log(idItem);
    if (idItem) {
      
      const purchase: IPurchase = {
        productId: idItem,
        clientId: this.userApiService.getClietToken(),
        purchaseDate: "2024-06-02T01:34:58.7932367",
        isApproved: false
      };
      console.log(purchase);
      this.purchaseApiService.addPurchase(purchase);
    }
  }
}
