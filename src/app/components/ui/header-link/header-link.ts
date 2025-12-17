import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'tgm-header-link',
  templateUrl: './header-link.html',
  styleUrls: ['./header-link.scss'],
  imports: [CommonModule, RouterLink],
})
export class HeaderLinkComponent {
  isOpen: boolean = true;
  @Input() title!: string;
  @Input() items!: { name: string; link: string }[];
  @Input() headerToggled!: boolean;

  toggleMenu() {
    this.isOpen = !this.isOpen;
  }

  ngOnChanges() {
    if (this.headerToggled === false) {
      this.isOpen = false;
    }
  }
}
