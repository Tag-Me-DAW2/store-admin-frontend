import { Component } from '@angular/core';
import { RouterOutlet, RouterLinkWithHref } from '@angular/router';

@Component({
  selector: 'app-header-page',
  templateUrl: './header-page.html',
  styleUrl: './header-page.scss',
  imports: [RouterOutlet, RouterLinkWithHref],
})
export class HeaderPage {}
