import { Component } from '@angular/core';
import { ApprovalsComponent } from '../approvals/approvals.component';
import { ContributionsComponent } from '../contributions/contributions.component';
import { PuschasesComponent } from '../../admin/puschases/puschases.component';

@Component({
  selector: 'app-dashboard-admin',
  standalone: true,
  imports: [ApprovalsComponent, PuschasesComponent, ContributionsComponent],
  templateUrl: './dashboard-admin.component.html',
  styleUrl: './dashboard-admin.component.css'
})
export class DashboardAdminComponent {

}
