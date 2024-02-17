import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../_services/layout.service';
import {
  Observable,
  Subject,
  Subscription,
  flatMap,
  mergeMap,
  of,
  switchMap,
  take,
} from 'rxjs';
import { Layout } from '../_models/layout';
import { LayoutRow, LayoutSection } from '../_models/layoutControl';
import { ReportParams } from '../_models/reportParams';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css', '../_styles/form.styles.css'],
})
export class ReportComponent implements OnInit {
  reportParams: ReportParams | undefined;
  reportSections: LayoutSection[] = [];
  reportGenerationComplete: boolean = false;
  reportLayoutSubscription: Subscription = new Subscription();
  selectedClientSubscription: Subscription = new Subscription();
  buildReportObs: Observable<void>;

  constructor(
    private layoutService: LayoutService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {
    this.buildReportObs = this.createBuildReportObservable();
  }

  ngOnInit(): void {
    this.spinner.show();

    this.layoutService.reportParams$
      .pipe(
        take(1),
        switchMap((reportParams: ReportParams | null) => {
          if (reportParams) {
            this.reportParams = reportParams;
            return this.buildReportObs;
          } else {
            return of(null);
          }
        })
      )
      .subscribe({
        next: (_) => {
          this.reportGenerationComplete = true;
        },
        error: (error) => {
          this.toastr.error(error);
        },
        complete: () => {
          this.spinner.hide();
        },
      });
  }

  createBuildReportObservable(): Observable<void> {
    return new Observable((observer) => {
      try {
        this.buildReport();

        observer.next();
        observer.complete();
      } catch (error) {
        observer.error(error);
      }
    });
  }

  buildReport() {
    if (this.reportParams) {
      this.reportParams.layout.controls.forEach((control) => {
        let section: LayoutSection | undefined;
        let row: LayoutRow | undefined;

        section = this.reportSections.find((reportSection) => {
          return reportSection.sectionNumber === control.section;
        });

        if (!section) {
          section = { sectionNumber: control.section, rows: [] };
          this.reportSections.push(section);
        }

        row = section.rows.find((sectionRow) => {
          return sectionRow.rowNumber == control.row;
        });

        if (!row) {
          row = { rowNumber: control.row, controls: [] };
          section.rows.push(row);
        }

        row.controls.push(control);
      });

      this.reportSections.forEach((section) => {
        section.rows = section.rows.sort((a, b) => {
          return a.rowNumber - b.rowNumber;
        });

        section.rows.forEach((row) => {
          row.controls = row.controls.sort((a, b) => {
            return a.id - b.id;
          });
        });
      });

      this.reportSections = this.reportSections.sort((a, b) => {
        return a.sectionNumber - b.sectionNumber;
      });
    }
  }
}
