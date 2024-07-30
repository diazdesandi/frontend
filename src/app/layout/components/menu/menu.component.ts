import { Component, Input } from '@angular/core';
import { MenuItem } from '../../../shared/interfaces';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
})
export class MenuComponent {
  @Input() items: MenuItem[] = [];
  @Input() openingMode: 'click' | 'mouseover' = 'click';

  selectedItem: MenuItem | null = null;

  viewOptions(item: MenuItem) {
    this.selectedItem = this.selectedItem === item ? null : item;
  }
}
