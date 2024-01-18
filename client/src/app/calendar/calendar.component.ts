import { Component, OnInit } from '@angular/core';
import { DateBatch } from '../_models/dateBatch';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent implements OnInit {
  selectedMonth: number = 0;
  selectedYear: number = 2024;
  dateRange: Date[] = [];
  dateBatches: DateBatch[] = [];

  ngOnInit(): void {
    this.dateRange = this.initializeAppointmentRange();
    this.dateBatches = this.initializeDateBatches(this.dateRange);
  }

  private initializeAppointmentRange(): Date[] {
    let dateToAdd: Date = new Date(this.selectedYear, this.selectedMonth, 1);
    let monthCompleted: boolean = false;
    let dateCounter: number = 0;
    let dateRange: Date[] = [];

    while (!monthCompleted) {
      dateCounter++;

      dateToAdd = new Date(this.selectedYear, this.selectedMonth, dateCounter);

      if (dateToAdd.getMonth() !== this.selectedMonth) {
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
}
