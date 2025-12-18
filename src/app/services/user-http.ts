import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { UserUpdateRequest } from '../models/request/user-update-request';
import { map, Observable } from 'rxjs';
import { UserResponse } from '../models/response/user-response';
import { PageModel } from '../models/PageModel';
import { UserInsertRequest } from '../models/request/user-insert-request';

@Injectable({
  providedIn: 'root',
})
export class UserHttpService {
  private apiUrl = 'http://localhost:8080/users';
  HttpClient = inject(HttpClient);

  updateUser(userId: number, userData: UserUpdateRequest): Observable<UserResponse> {
    return this.HttpClient.put<UserResponse>(`${this.apiUrl}/${userId}`, userData);
  }

  getUserCount(): Observable<number> {
    return this.HttpClient.get<PageModel<UserResponse>>(`${this.apiUrl}`).pipe(
      map((response) => response.totalElements)
    );
  }

  getUsers(pageNumber: number, pageSize: number): Observable<PageModel<UserResponse>> {
    return this.HttpClient.get<PageModel<UserResponse>>(`${this.apiUrl}?page=${pageNumber}&size=${pageSize}`);
  }

  getUser(id: number): Observable<UserResponse> {
    return this.HttpClient.get<UserResponse>(`${this.apiUrl}/${id}`);
  }

  createUser(newUser: UserInsertRequest): Observable<UserResponse> {
    return this.HttpClient.post<UserResponse>(`${this.apiUrl}`, newUser);
  }

  deleteUserById(userId: number): Observable<void> {
    return this.HttpClient.delete<void>(`${this.apiUrl}/${userId}`);
  }
}
