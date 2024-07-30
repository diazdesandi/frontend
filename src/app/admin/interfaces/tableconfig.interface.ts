import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Header } from './header.interface';
import { FormField } from '../../shared/interfaces';

export interface TableConfig<T> {
  actions: {
    create: (data: T) => Observable<any>;
    update: (data: T, id: string) => Observable<any>;
    delete: (id: string) => Observable<any>;
  };
  columns: Column[];
  data: T[];
  fields: FormField[];
  form: FormGroup;
  header: Header;
}

export interface Column {
  field: string;
  header: string;
}
