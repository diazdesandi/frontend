export interface Calendar {
  selectedDate: Date;
  hours: Hour[];
  selectedHour: Hour;
  onDateSelect(event: Date): void;
  printSelectedDateTime(): void;
}

export interface Hour {
  label: string;
  value: Date;
  available: boolean;
}

export enum DayOfWeek {
  Sunday = 0,
  Monday = 1,
  Tuesday = 2,
  Wednesday = 3,
  Thursday = 4,
  Friday = 5,
  Saturday = 6,
}
