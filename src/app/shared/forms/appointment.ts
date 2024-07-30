import { FormField } from '../interfaces/form.interface';

export const appointmentFields: FormField[] = [
  {
    id: 'title',
    label: 'Title',
    name: 'title',
    helpText: 'Enter title.',
    type: 'text',
  },
  {
    id: 'responsible',
    label: 'Responsible',
    name: 'responsible',
    helpText: 'Enter responsible.',
    type: 'text',
  },
  {
    id: 'description',
    label: 'Description',
    name: 'description',
    helpText: 'Enter description.',
    type: 'text',
  },
  {
    id: 'start_hour',
    label: 'Starting at',
    name: 'start_hour',
    helpText: 'Selected hour.',
    type: 'datetime',
  },
  {
    id: 'end_hour',
    label: 'Ending at',
    name: 'end_hour',
    helpText: 'Selected end hour.',
    type: 'datetime',
  },
  {
    id: 'location',
    label: 'Location',
    name: 'location',
    helpText: 'Selected location.',
    type: 'text',
  },
  {
    id: 'meetingRoom',
    label: 'Meeting Room',
    name: 'meetingRoom',
    helpText: 'Selected meeting room.',
    type: 'text',
  },
];
