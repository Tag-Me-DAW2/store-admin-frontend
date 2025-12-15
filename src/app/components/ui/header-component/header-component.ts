import {Component, EventEmitter, Input, Output} from '@angular/core';
import {RouterLink} from "@angular/router";
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'header-component',
  imports: [
    RouterLink,
    FormsModule,
    CommonModule
  ],
  templateUrl: './header-component.html',
  styleUrl: './header-component.scss',
})
export class HeaderComponent {
  isOpen: boolean = false;
  isCollapsed: boolean = false;

  toggleMenu() {
    this.isOpen = !this.isOpen;
  }

  toggleHeader() {
    this.isCollapsed = !this.isCollapsed;
  }
}
