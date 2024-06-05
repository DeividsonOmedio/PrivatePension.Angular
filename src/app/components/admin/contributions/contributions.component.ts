import { Component, OnInit } from '@angular/core';
import { IContribution } from '../../../models/contribution';
import { ContributionApiService } from '../../../services/contribution-api.service';
import { CurrencyPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-contributions',
  standalone: true,
  imports: [DatePipe, CurrencyPipe],
  templateUrl: './contributions.component.html',
  styleUrl: './contributions.component.css'
})
export class ContributionsComponent implements OnInit {
 
  
  ContribuitionList: IContribution[] = []; 
  
    constructor(private apiContribuitionsService: ContributionApiService) {}
  
    
    ngOnInit(): void {
      this.apiContribuitionsService.contribuitionsList$.subscribe((contribuitions) => {
        this.ContribuitionList = contribuitions;
        console.log(contribuitions);
      });
      console.log(this.ContribuitionList);
    }
  }