import { Component } from '@angular/core';
import { RouterOutlet, RouterLinkWithHref } from '@angular/router';
import {HeaderComponent} from '../../ui/header-component/header-component';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-header-page',
  templateUrl: './dashboard-page.html',
  styleUrl: './dashboard-page.scss',
  imports: [RouterOutlet, HeaderComponent],
})
export class DashboardPage {

}
