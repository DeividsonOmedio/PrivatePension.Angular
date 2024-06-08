import { Component, Input, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
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
  user?: IUser;
  @Input() AmountDeposit: number = 0;

  constructor(private apiUserService: UserApiService, private route: Router) {}

  ngOnInit(): void {
    this.adminList$ = this.apiUserService.getAdmins();
    this.clientList$ = this.apiUserService.getClients();
  }

  Delete(id: number | undefined) {
    const confirm = window.confirm('Confirma a exclusão do usuário?');
    if (id && confirm)
      this.apiUserService.deleteUser(id);
  }

  Edit(id: number | undefined) {
    this.route.navigate(['/admin/manageuser/edit', id]);
  }
  OpenModal(user: IUser) {
    this.user = user;
    const modal = document.getElementById('spnvalueDeposit')
    if (modal)
      modal.style.display = 'flex';
  }
  ClosedModal() {
    const modal = document.getElementById('spnvalueDeposit')
    if (modal)
      modal.style.display = 'none';
  }

  insertInWallet() {
    const id = this.user?.id;
    if (id)
      this.apiUserService.insertInWallet(id, this.AmountDeposit);
    this.ClosedModal();
  }

  trackById(index: number, item: IUser): number {
    return item.id || 0;
  }
}
