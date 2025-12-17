import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { TitleCasePipe, CurrencyPipe } from '@angular/common';
import { PageModel } from '../../../models/PageModel';
import { ProductService } from '../../../services/product-service';

@Component({
  selector: 'table-component',
  imports: [TitleCasePipe, CurrencyPipe],
  templateUrl: './table-component.html',
  styleUrl: './table-component.scss',
})
export class TableComponent {
  productService = inject(ProductService);

  @Input() dataPage!: PageModel<any>;
  @Input() columns!: string[];
  @Output() itemClicked = new EventEmitter<number>();

  sendItemIdClicked(id: number) {
    this.itemClicked.emit(id);
  }
}
