import { inject, Injectable } from '@angular/core';
import { UserHttpService } from './user-http';
import { UserUpdateRequest } from '../models/request/user-update-request';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  httpUser = inject(UserHttpService);

  updateUser(userId: number, userData: UserUpdateRequest): void {
    this.httpUser.updateUser(userId, userData).subscribe({
      next: (response) => {
        localStorage.setItem('user', JSON.stringify(response));
        Swal.fire({
          icon: 'success',
          title: 'User Updated',
          text: 'The user information has been successfully updated.',
        });
      },
      error: (error) => {
        console.error('Error updating user:', error);
      },
    });
  }
}
