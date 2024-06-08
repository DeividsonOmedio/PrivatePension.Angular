import { Component, OnInit } from '@angular/core';
import { IContribution } from '../../../models/contribution';
import { ContributionApiService } from '../../../services/contribution-api.service';
import { AsyncPipe, CurrencyPipe, DatePipe } from '@angular/common';
import { IContributionDtos } from '../../../dtos/contributionDto';

@Component({
  selector: 'app-contributions',
  standalone: true,
  imports: [DatePipe, CurrencyPipe, AsyncPipe],
  templateUrl: './contributions.component.html',
  styleUrl: './contributions.component.css'
})
export class ContributionsComponent implements OnInit {
 
  
  ContribuitionList: IContribution[] = []; 
  ContribuitionListDto: IContributionDtos[] = []; 
  
    constructor(private apiContribuitionsService: ContributionApiService) {}
  
    
    ngOnInit(): void {
      this.apiContribuitionsService.Initialize();
      this.apiContribuitionsService.contribuitionsList$.subscribe((contribuitions) => {
        console.log(contribuitions);
        this.ContribuitionList = contribuitions;
        const result = this.apiContribuitionsService.converter(this.ContribuitionList);
        this.ContribuitionListDto = result.filter((approval, index, self) =>
          index === self.findIndex((t) => t.id === approval.id)
        );
      });
    }
  }