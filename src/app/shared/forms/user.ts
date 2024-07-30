import { FormField } from '../interfaces';

const roles = [
  {
    id: 'admin',
    name: 'Administrator',
  },
  {
    id: 'user',
    name: 'User',
  },
];

export const userFields: FormField[] = [
  {
    id: 'name',
    type: 'text',
    name: 'name',
    label: 'Name',
    helpText: 'Enter the name of the user',
  },
  {
    id: 'email',
    type: 'email',
    name: 'email',
    label: 'Email',
    helpText: 'Enter the email of the user',
  },
  {
    id: 'password',
    type: 'password',
    name: 'password',
    label: 'Password',
    helpText: 'Enter the password of the user',
  },
  {
    id: 'roles',
    type: 'select',
    name: 'roles',
    label: 'Roles',
    helpText: 'Select the role of the user',
    options: roles,
  },
];
