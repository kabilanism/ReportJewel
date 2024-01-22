import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ModalService } from '../_services/modal-service.service';

@Component({
  selector: 'app-calendar-item',
  templateUrl: './calendar-item.component.html',
  styleUrls: ['./calendar-item.component.css'],
})
export class CalendarItemComponent {
  @Input() date: Date | undefined;
  @Output() calendarItemClicked: EventEmitter<void> = new EventEmitter<void>();

  constructor(private modalService: ModalService) {}

  onCalendarItemClicked() {
    console.log('hi..');
    this.modalService.openModalWithComponent();
  }
}
