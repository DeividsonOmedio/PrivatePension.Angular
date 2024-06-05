import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IUser } from '../../../models/user';
import { UserApiService } from '../../../services/user-api.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  adminList$: Observable<IUser[]> = new Observable<IUser[]>();
  clientList$: Observable<IUser[]> = new Observable<IUser[]>();

  constructor(private apiUserService: UserApiService) {}

  ngOnInit(): void {
    this.adminList$ = this.apiUserService.getAdmins();
    this.clientList$ = this.apiUserService.getClients();
  }

  Delete() {
    throw new Error('Method not implemented.');
  }

  Edit() {
    throw new Error('Method not implemented.');
  }

  insertInWallet() {
    throw new Error('Method not implemented.');
  }

  trackById(index: number, item: IUser): number {
    return item.id || 0;
  }
}
