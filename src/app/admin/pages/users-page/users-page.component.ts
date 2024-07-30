import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../../shared/services';
import { User } from '../../../shared/interfaces';
import { Header, TableConfig } from '../../interfaces';
import { userFields } from '../../../shared/forms';

@Component({
  selector: 'app-users-page',
  template: ` <app-table [config]="config" /> `,
})
export class UsersPageComponent implements OnInit {
  config: TableConfig<User> = {} as TableConfig<User>;
  users: User[] = [];

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
  ) {}

  ngOnInit() {
    this.componentInit();
  }

  componentInit() {
    this.userService.getAll().subscribe((users) => {
      this.users = users;
      this.config = this.createTableConfig();
    });
  }

  createTableConfig(): TableConfig<User> {
    const form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(12),
        ],
      ],
      roles: ['', [Validators.required]],
    });

    return {
      form,
      fields: userFields,
      header: this.getHeader(),
      actions: this.getActions(),
      columns: this.getColumns(),
      data: this.users,
    };
  }

  getHeader(): Header {
    return {
      title: 'Users',
      icon: 'pi pi-users',
      length: this.users.length,
      showButton: true,
    };
  }

  getActions() {
    return {
      create: (data: User) => this.userService.create(data),
      update: (data: User, id: string) => this.userService.update(data, id),
      delete: (id: string) => this.userService.delete(id),
    };
  }

  getColumns() {
    return [
      { field: 'name', header: 'Name' },
      { field: 'email', header: 'Email' },
      { field: 'roles', header: 'Roles' },
    ];
  }
}
