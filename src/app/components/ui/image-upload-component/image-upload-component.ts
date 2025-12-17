import { Component, EventEmitter, inject, Output } from '@angular/core';
import { AlertService } from '../../../services/AlertService';

@Component({
  selector: 'tgm-image-upload-component',
  templateUrl: './image-upload-component.html',
  styleUrls: ['./image-upload-component.scss'],
  imports: [],
})
export class ImageUploadComponent {
  @Output() imageBase64 = new EventEmitter<string>();
  preview: string | ArrayBuffer | null = null;

  alertService = inject(AlertService);

  onFileSelected(event: any) {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) {
      return;
    }

    const file = input.files[0];

    if (!file.type.startsWith('image/')) {
      this.alertService.error({
        title: 'Invalid File Type',
        text: 'Please select a valid image file.',
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      this.preview = reader.result;
      this.imageBase64.emit(reader.result as string);
    };

    reader.readAsDataURL(file);
  }
}
