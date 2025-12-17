import { Component, EventEmitter, inject, Input, Output, output } from '@angular/core';
import { AuthService } from '../../../services/auth-service';
import { UserResponse } from '../../../models/response/user-response';
import { CommonModule } from '@angular/common';
import { TgmButtonComponent } from '../tgm-button/tgm-button';
import { Router } from '@angular/router';

@Component({
  selector: 'tgm-user-menu',
  templateUrl: './user-menu.html',
  styleUrls: ['./user-menu.scss'],
  imports: [CommonModule, TgmButtonComponent],
})
export class UserMenuComponent {
  user: UserResponse = JSON.parse(localStorage.getItem('user') || '{}');
  authService = inject(AuthService);
  router = inject(Router);
  @Input() menuOpen: boolean = false;
  @Output() editUser = new EventEmitter<boolean>();

  userDetailsPopup: boolean = false;

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  modify() {
    this.editUser.emit(true);
  }
}
