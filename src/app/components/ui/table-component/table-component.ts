import { Component, Input } from '@angular/core';

@Component({
  selector: 'table-component',
  imports: [],
  templateUrl: './table-component.html',
  styleUrl: './table-component.scss',
})
export class TableComponent {
    @Input() data!: any[];
    @Input() columns!: string[];
}
