import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Header } from '../../interfaces';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  @Input() data: Header = {} as Header;

  @Output() btnClick = new EventEmitter<void>();

  onButtonClick() {
    this.btnClick.emit();
  }
}
