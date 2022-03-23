import { Injectable } from '@angular/core';

export interface TimeUnit {
  Name: string;
  Hour: number;
  Minute: number;
}

@Injectable()
export class DateTimePickerService {
  getTimeUnits(): TimeUnit[] {
    return [
      {
        Name: '9:00',
        Hour: 9,
        Minute: 0,
      },
      {
        Name: '9:15',
        Hour: 9,
        Minute: 15,
      },
      {
        Name: '9:30',
        Hour: 9,
        Minute: 30,
      },
      {
        Name: '9:45',
        Hour: 9,
        Minute: 45,
      },
    ];
  }
}
