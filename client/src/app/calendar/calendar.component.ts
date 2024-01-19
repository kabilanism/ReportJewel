import {
  Component,
  HostListener,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { DateBatch } from '../_models/dateBatch';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgForm } from '@angular/forms';
import { Subject } from 'rxjs';
import { ModalService } from '../_services/modal-service.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent implements OnInit {
  @ViewChild('createEventForm') createEventForm: NgForm | undefined;
  @HostListener('window:beforeunload', ['$event']) unloadNotification(
    $event: any
  ) {
    if (this.createEventForm?.dirty) {
      $event.returnValue = true;
    }
  }
  modalRef?: BsModalRef;

  selectedMonth: number = 0;
  selectedYear: number = 2024;
  dateRange: Date[] = [];
  dateBatches: DateBatch[] = [];
  months: string[] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  constructor(private modalService: ModalService) {}

  ngOnInit(): void {
    this.initializeCalendar();
  }

  private initializeCalendar() {
    this.dateRange = this.initializeAppointmentRange();
    this.dateBatches = this.initializeDateBatches(this.dateRange);
  }

  private initializeAppointmentRange(): Date[] {
    let dateToAdd: Date = new Date(this.selectedYear, +this.selectedMonth, 1);
    let monthCompleted: boolean = false;
    let dateCounter: number = 0;
    let dateRange: Date[] = [];

    while (!monthCompleted) {
      dateCounter++;

      dateToAdd = new Date(this.selectedYear, +this.selectedMonth, dateCounter);

      if (dateToAdd.getMonth() !== +this.selectedMonth) {
        monthCompleted = true;
      } else {
        dateRange.push(dateToAdd);
      }
    }

    return dateRange;
  }

  private initializeDateBatches(dateRange: Date[]): DateBatch[] {
    let dateBatches: DateBatch[] = [];
    let batchSplitComplete: boolean = false;
    let dateRangeMutated: Date[] = dateRange.slice();

    while (!batchSplitComplete) {
      if (dateRangeMutated.length < 7) {
        dateBatches.push(new DateBatch(dateRangeMutated));
        batchSplitComplete = true;
      } else {
        dateBatches.push(new DateBatch(dateRangeMutated.splice(0, 7)));
      }
    }

    return dateBatches;
  }

  onMonthSelected(event: Event) {
    this.initializeCalendar();
  }

  onCalendarItemClick() {
    this.modalService.showModal();
  }
  // onCalendarItemClicked(modalTemplate: TemplateRef<void>) {
  //   this.modalRef = this.modalService.show(
  //     modalTemplate,
  //     Object.assign({}, { class: 'gray modal-lg' })
  //   );
  // }

  createEvent() {
    console.log(this.createEventForm?.value);
  }
}
