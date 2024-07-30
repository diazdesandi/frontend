import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Column } from '../../interfaces';

@Component({
  selector: 'app-row',
  templateUrl: './row.component.html',
  styles: [],
})
export class RowComponent {
  @Input() rowData: any;
  @Input() columns: Column[] = [];
  @Output() edit = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();

  selectedRow: any;

  selectRow() {
    this.selectedRow = this.rowData;
  }

  editRow() {
    this.edit.emit(this.selectedRow);
  }

  deleteRow() {
    this.delete.emit(this.selectedRow.id);
  }
}
