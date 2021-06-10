import { Component } from '@angular/core';

interface Day {
  value: string;
  viewValue: string;
}

interface Time {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.css'],
})
export class DeliveryComponent {
  selectedDay!: string;
  selectedHour!: string;

  days: Day[] = [
    {value: 'day-0', viewValue: 'Sunday'},
    {value: 'day-1', viewValue: 'Monday'},
    {value: 'day-2', viewValue: 'Tuesday'},
    {value: 'day-3', viewValue: 'Wednesday'},
    {value: 'day-4', viewValue: 'Thursday'},
    {value: 'day-5', viewValue: 'Friday'},
    {value: 'day-6', viewValue: 'Saturday'}
  ];

  hours: Time[] = [
    {value: 'hour-9', viewValue: '09:00'},
    {value: 'hour-10', viewValue: '10:00'},
    {value: 'hour-11', viewValue: '1 1:00'},
    {value: 'hour-12', viewValue: '12:00'},
    {value: 'hour-13', viewValue: '13:00'},
    {value: 'hour-14', viewValue: '14:00'},
    {value: 'hour-15', viewValue: '15:00'},
    {value: 'hour-16', viewValue: '16:00'},
    {value: 'hour-17', viewValue: '17:00'},
    {value: 'hour-18', viewValue: '18:00'}
  ]
}
