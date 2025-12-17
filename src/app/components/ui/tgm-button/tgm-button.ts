import {
  Component,
  EventEmitter,
  HostBinding,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'button[tgm-button], a[tgm-button]',
  template: '<ng-content></ng-content>',
  styleUrls: ['./tgm-button.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TgmButtonComponent {
  @Input() funcion: 'normal' | 'alternativa' | 'peligrosa' = 'normal';
  @Input() importance: 'primaria' | 'secundaria' | 'terciaria' = 'primaria';
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  @Input() href: string = '';
  @Output() onClick = new EventEmitter<void>();

  handleOnClick(): void {
    this.onClick.emit();
  }

  @HostBinding('class')
  get clazz(): Record<string, boolean> {
    return {
      boton: true,

      'boton--funcionNormal': this.funcion === 'normal',
      'boton--funcionAlternativa': this.funcion === 'alternativa',
      'boton--funcionPeligrosa': this.funcion === 'peligrosa',

      'boton--importancePrimaria': this.importance === 'primaria',
      'boton--importanceSecundaria': this.importance === 'secundaria',
      'boton--importanceTerciaria': this.importance === 'terciaria',

      'boton--sizeSmall': this.size === 'small',
      'boton--sizeMedium': this.size === 'medium',
      'boton--sizeLarge': this.size === 'large',
    };
  }
}
