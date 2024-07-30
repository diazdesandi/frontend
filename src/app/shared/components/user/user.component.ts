import { Component, Input } from '@angular/core';
import { SmallUser } from '../../interfaces';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
})
export class UserComponent {
  @Input() user: SmallUser = {} as SmallUser;
  @Input() showEmail: boolean = true;
  @Input() optionText: string = '';
}
