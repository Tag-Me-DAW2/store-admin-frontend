import { Component, Output, EventEmitter } from '@angular/core';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'detail-dialog',
  standalone: true,
  imports: [
    RouterOutlet
  ],
  templateUrl: './detail-dialog.html',
  styleUrl: './detail-dialog.scss'
})
export class DetailDialogComponent {
  @Output() closeDialog = new EventEmitter<void>();

  onClose() {
    this.closeDialog.emit();
  }
}
