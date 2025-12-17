import { Component } from '@angular/core';
import { RouterOutlet, RouterLinkWithHref } from '@angular/router';
import { HeaderComponent } from '../../ui/header-component/header-component';
import { BehaviorSubject } from 'rxjs';
import { UserDialogComponent } from '../../ui/user-dialog/user-dialog';

@Component({
  selector: 'app-header-page',
  templateUrl: './dashboard-page.html',
  styleUrl: './dashboard-page.scss',
  imports: [RouterOutlet, HeaderComponent, UserDialogComponent],
})
export class DashboardPage {
  userDetailsPopup: boolean = false;

  closeEditUser() {
    console.log('Closing user edit dialog');
    this.userDetailsPopup = false;
  }

  openEditUser(event: boolean) {
    this.userDetailsPopup = event;
  }
}
