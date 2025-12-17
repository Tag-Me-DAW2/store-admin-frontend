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
  @Input() function: 'normal' | 'alternative' | 'danger' = 'normal';
  @Input() importance: 'primary' | 'secondary' | 'tertiary' = 'primary';
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

      'boton--functionNormal': this.function === 'normal',
      'boton--functionAlternative': this.function === 'alternative',
      'boton--functionDanger': this.function === 'danger',

      'boton--importancePrimary': this.importance === 'primary',
      'boton--importanceSecondary': this.importance === 'secondary',
      'boton--importanceTertiary': this.importance === 'tertiary',

      'boton--sizeSmall': this.size === 'small',
      'boton--sizeMedium': this.size === 'medium',
      'boton--sizeLarge': this.size === 'large',
    };
  }
}
