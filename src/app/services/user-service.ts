import { inject, Injectable } from '@angular/core';
import { UserHttpService } from './user-http';
import { UserUpdateRequest } from '../models/request/user-update-request';
import Swal from 'sweetalert2';
import { AlertService } from './AlertService';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  httpUser = inject(UserHttpService);
  alertService = inject(AlertService);

  updateUser(userId: number, userData: UserUpdateRequest): void {
    this.httpUser.updateUser(userId, userData).subscribe({
      next: (response) => {
        localStorage.setItem('user', JSON.stringify(response));
        this.alertService.success({
          title: 'User Updated',
          text: 'The user information has been successfully updated.',
        });
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
