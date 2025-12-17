import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'tgm-image-upload-component',
  templateUrl: './image-upload-component.html',
  styleUrls: ['./image-upload-component.scss'],
  imports: [],
})
export class ImageUploadComponent {
  @Output() imageBase64 = new EventEmitter<string>();
  preview: string | ArrayBuffer | null = null;

  onFileSelected(event: any) {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) {
      return;
    }

    const file = input.files[0];

    if (!file.type.startsWith('image/')) {
      console.error('El archivo seleccionado no es una imagen.'); // Cambiar a Swal2 o similar si es necesario
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
