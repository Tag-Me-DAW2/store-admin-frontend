import {
  Component,
  effect,
  ElementRef,
  EventEmitter,
  inject,
  Input,
  Output,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HeaderLinkComponent } from '../header-link/header-link';
import { AuthService } from '../../../services/auth-service';
import { UserMenuComponent } from '../user-menu/user-menu';
import { UserDialogComponent } from '../user-dialog/user-dialog';
import { UserService } from '../../../services/user-service';

@Component({
  selector: 'header-component',
  imports: [
    RouterLink,
    FormsModule,
    CommonModule,
    HeaderLinkComponent,
    UserMenuComponent,
    UserDialogComponent,
  ],
  templateUrl: './header-component.html',
  styleUrl: './header-component.scss',
})
export class HeaderComponent {
  isCollapsed: boolean = false;
  menuOpen = false;
  userService = inject(UserService);
  @Output() userDetailsPopup = new EventEmitter<boolean>();
  @Input() headerType: 'horizontal' | 'vertical' = 'vertical';
  user = JSON.parse(localStorage.getItem('user') || '{}');

  renderer = inject(Renderer2);
  elementRef = inject(ElementRef);
  clickListener!: () => void;

  constructor() {
    effect(() => {
      this.userService.refreshUser$();
      this.user = JSON.parse(localStorage.getItem('user') || '{}');
    });
  }

  ngAfterViewInit() {
    this.clickListener = this.renderer.listen('document', 'click', (event: Event) => {
      const target = event.target as HTMLElement;

      const clickedInsideMenu = target.closest('[class^="user-menu"]') !== null;
      const clickedOnIcon = this.elementRef.nativeElement
        .querySelector('.header__app-user-icon')
        ?.contains(target);

      if (!clickedInsideMenu && !clickedOnIcon) {
        this.closeUserMenu();
      } else {
        this.menuOpen = true;
      }
    });
  }

  toggleHeader() {
    this.isCollapsed = !this.isCollapsed;
  }

  openUserMenu() {
    this.menuOpen = !this.menuOpen;
  }

  closeUserMenu() {
    this.menuOpen = false;
  }

  openEditUser() {
    this.userDetailsPopup.emit(true);
  }
}
