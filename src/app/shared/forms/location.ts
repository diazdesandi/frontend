import { FormField } from '../interfaces';

export const locationFields: FormField[] = [
  {
    id: 'name',
    type: 'text',
    name: 'name',
    label: 'Name',
    helpText: 'Enter the name of the location',
  },
  {
    id: 'address',
    type: 'text',
    name: 'address',
    label: 'Address',
    helpText: 'Enter the address of the location',
  },
  {
    id: 'department',
    type: 'text',
    name: 'department',
    label: 'Department',
    helpText: 'Enter the department of the location',
  },
];
