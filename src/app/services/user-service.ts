import { inject, Injectable, signal } from '@angular/core';
import { UserHttpService } from './user-http';
import { UserUpdateRequest } from '../models/request/user-update-request';
import Swal from 'sweetalert2';
import { AlertService } from './AlertService';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { UserResponse } from '../models/response/user-response';
import { UserInsertRequest } from '../models/request/user-insert-request';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  httpUser = inject(UserHttpService);
  alertService = inject(AlertService);

  private _refreshUser = signal(0);
  refreshUser$ = this._refreshUser.asReadonly();

  updateUser(userId: number, userData: UserUpdateRequest): Observable<UserResponse> {
    return this.httpUser.updateUser(userId, userData).pipe(
      tap({
        next: (response: UserResponse) => {
          if (response.id === JSON.parse(localStorage.getItem('user') || '{}').id) {
            localStorage.setItem('user', JSON.stringify(response));
          }

          this.alertService.success({
            title: 'User Updated',
            text: 'The user information has been successfully updated.',
          });

          this._refreshUser.update((n) => n + 1);
        },
        error: (error) => {
          console.error('Error updating user:', error);
        },
      })
    );
  }

  getUsers(pageNumber: number, pageSize: number) {
    return this.httpUser.getUsers(pageNumber, pageSize);
  }

  getUser(id: number) {
    return this.httpUser.getUser(id);
  }

  getUserCount() {
    return this.httpUser.getUserCount();
  }

  createUser(newUser: UserInsertRequest) {
    return this.httpUser.createUser(newUser);
  }

  deleteUserById(userId: number) {
    return this.httpUser.deleteUserById(userId);
  }
}
