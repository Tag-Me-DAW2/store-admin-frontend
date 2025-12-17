import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { UserUpdateRequest } from '../models/request/user-update-request';
import { Observable } from 'rxjs';
import { UserResponse } from '../models/response/user-response';

@Injectable({
  providedIn: 'root',
})
export class UserHttpService {
  private apiUrl = 'http://localhost:8080/users';
  HttpClient = inject(HttpClient);

  updateUser(userId: number, userData: UserUpdateRequest): Observable<UserResponse> {
    return this.HttpClient.put<UserResponse>(`${this.apiUrl}/${userId}`, userData);
  }
}
