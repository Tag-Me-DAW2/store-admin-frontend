import { inject, Injectable, signal } from '@angular/core';
import { UserHttpService } from './user-http';
import { UserUpdateRequest } from '../models/request/user-update-request';
import Swal from 'sweetalert2';
import { AlertService } from './AlertService';
import { BehaviorSubject } from 'rxjs';
import { UserResponse } from '../models/response/user-response';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  httpUser = inject(UserHttpService);
  alertService = inject(AlertService);

  private _refreshUser = signal(0);
  refreshUser$ = this._refreshUser.asReadonly();

  updateUser(userId: number, userData: UserUpdateRequest): void {
    this.httpUser.updateUser(userId, userData).subscribe({
      next: (response) => {
        localStorage.setItem('user', JSON.stringify(response));
        this.alertService.success({
          title: 'User Updated',
          text: 'The user information has been successfully updated.',
        });
        this._refreshUser.update((n) => n + 1);
      },
      error: (error) => {
        console.error('Error updating user:', error);
      },
    });
  }

  getUserCount() {
    return this.httpUser.getUserCount();
  }
}
