import { Component, ElementRef, inject, Input, Renderer2 } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HeaderLinkComponent } from '../header-link/header-link';
import { AuthService } from '../../../services/auth-service';
import { UserMenuComponent } from '../user-menu/user-menu';

@Component({
  selector: 'header-component',
  imports: [RouterLink, FormsModule, CommonModule, HeaderLinkComponent, UserMenuComponent],
  templateUrl: './header-component.html',
  styleUrl: './header-component.scss',
})
export class HeaderComponent {
  isCollapsed: boolean = false;
  menuOpen = false;
  httpAuth = inject(AuthService);
  @Input() headerType: 'horizontal' | 'vertical' = 'vertical';

  renderer = inject(Renderer2);
  elementRef = inject(ElementRef);
  clickListener!: () => void;

  ngAfterViewInit() {
    this.clickListener = this.renderer.listen('document', 'click', (event: Event) => {
      const target = event.target as HTMLElement;
      const clickedInside =
        this.elementRef.nativeElement.querySelector('tgm-user-menu')?.contains(target) ||
        this.elementRef.nativeElement.querySelector('.header__app-user-icon')?.contains(target);

      if (!clickedInside) {
        this.closeUserMenu();
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
    // Lógica para abrir el popup de edición de usuario
    alert('Abrir popup de edición de usuario');
  }
}
