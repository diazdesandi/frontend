import { FormField } from '../interfaces';

export const meetingRoomFields: FormField[] = [
  {
    id: 'name',
    type: 'text',
    name: 'name',
    label: 'Name',
    helpText: 'Enter the name of the meeting room',
  },
  {
    id: 'occupancy',
    type: 'number',
    name: 'occupancy',
    label: 'Occupancy',
    helpText: 'Enter the number of people the room can accommodate',
  },
  {
    id: 'location',
    type: 'dropdown',
    name: 'location',
    label: 'Location',
    helpText: 'Select the location of the meeting room',
  },
  {
    id: 'department',
    type: 'text',
    name: 'department',
    label: 'Department',
    helpText: 'Enter the department that manages the meeting room',
  },
  {
    id: 'ammenities',
    type: 'select',
    name: 'ammenities',
    label: 'Ammenities',
    helpText: 'Select the ammenities available in the meeting room',
  },
];
