import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { AlertService } from '../../../services/AlertService';
import { ImageModel } from '../../../models/ImageModel';

@Component({
  selector: 'tgm-image-upload-component',
  templateUrl: './image-upload-component.html',
  styleUrls: ['./image-upload-component.scss'],
  imports: [],
})
export class ImageUploadComponent implements OnInit {
  @Output() imageSelected = new EventEmitter<ImageModel>();
  @Input() preview: string | ArrayBuffer | null = null;

  alertService = inject(AlertService);

  private readonly defaultImagePath = 'assets/product-no-image.svg';

  ngOnInit(): void {
    if (!this.preview) {
      this.loadDefaultImage();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['preview']) {
      if (!changes['preview'].currentValue) {
        this.loadDefaultImage();
      }
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;

    if (!input.files || input.files.length === 0 || !input.files[0]) {
      console.log('No file selected');
      this.loadDefaultImage();
      return;
    }

    const file = input.files[0];

    if (!file.type.startsWith('image/')) {
      this.alertService.error({
        title: 'Tipo de archivo inválido',
        text: 'Por favor, selecciona un archivo de imagen válido.',
      });
      input.value = '';
      return;
    }

    this.readFileAsBase64(file);
    input.value = '';
  }

  private readFileAsBase64(file: File) {
    const reader = new FileReader();

    reader.onload = () => {
      const base64 = reader.result as string;

      this.preview = base64;
      this.imageSelected.emit({
        image: base64,
        imageName: file.name,
      });
    };

    reader.readAsDataURL(file);
  }

  private async loadDefaultImage() {
    const response = await fetch(this.defaultImagePath);
    const blob = await response.blob();

    const file = new File([blob], 'product-no-image.svg', {
      type: blob.type || 'image/svg+xml',
    });

    this.readFileAsBase64(file);
  }
}
