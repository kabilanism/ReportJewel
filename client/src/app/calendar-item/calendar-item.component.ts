import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-calendar-item',
  templateUrl: './calendar-item.component.html',
  styleUrls: ['./calendar-item.component.css'],
})
export class CalendarItemComponent {
  @Input() date: Date | undefined;
  @Output() calendarItemClicked: EventEmitter<void> = new EventEmitter<void>();

  onCalendarItemClicked() {
    this.calendarItemClicked.emit();
  }
}
