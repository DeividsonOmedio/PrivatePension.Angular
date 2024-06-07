import { Component, OnInit } from '@angular/core';
import { IPurchase } from '../../../models/purchase';
import { IProduct } from '../../../models/product';
import { PurchaseApiService } from '../../../services/purchase-api.service';
import { ProductApiService } from '../../../services/product-api.service';
import { UserApiService } from '../../../services/user-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-for-sale',
  standalone: true,
  imports: [],
  templateUrl: './for-sale.component.html',
  styleUrl: './for-sale.component.css'
})
export class ForSaleComponent implements OnInit{
  produstsForSale: IProduct[] = [];
  

  constructor(private productApiService: ProductApiService, private purchaseApiService: PurchaseApiService, private userApiService: UserApiService, private routes: Router) {}
  ngOnInit(): void {
    this.productApiService.Initialize();
    this.productApiService.forSalesList$.subscribe((forSalesList) => {
      this.produstsForSale = forSalesList;
      console.log(forSalesList);
    });
  }

  purchase(idItem: number | undefined): void {
    if (!idItem) {
      console.error('ID do item não informado');
      return;
    }
    const purchase: IPurchase = {
      productId: idItem,
      clientId: parseInt(this.userApiService.getClietToken()),
      purchaseDate: new Date().toISOString(),
      isApproved: false
    };

    console.log(purchase);
    
    // Adicionar a compra e recarregar a página ou dados independentemente do resultado
    this.purchaseApiService.addPurchase(purchase).subscribe({
      next: response => {
        console.log('Compra adicionada com sucesso', response);
      },
      error: err => {
        console.error('Erro ao adicionar compra', err);
        // Recarrega a página ou inicializa os dados mesmo após erro
        this.purchaseApiService.Initialize();
        this.reloadPageOrData();
      },
      complete: () => {
        console.log('Solicitação concluída');
        // Recarrega a página ou inicializa os dados após a conclusão bem-sucedida
        this.reloadPageOrData();
      }
    });
  }

  reloadPageOrData(): void {
    // Recarregar a página
    // window.location.reload();

    // Ou recarregar apenas os dados
    this.productApiService.Initialize();
  }
}