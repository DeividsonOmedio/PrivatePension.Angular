import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderClientsComponent } from '../../components/clints/header-clients/header-clients.component';

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [RouterModule, HeaderClientsComponent],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.css'
})
export class ClientsComponent {

}
