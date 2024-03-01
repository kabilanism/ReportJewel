import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { LayoutService } from '../_services/layout.service';
import { Observable, Subscription, of, switchMap, take } from 'rxjs';
import {
  LayoutControl,
  LayoutRow,
  LayoutSection,
} from '../_models/layoutControl';
import { ReportParams } from '../_models/reportParams';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { GlossaryItem } from '../_models/glossayItem';
import { FadeIn } from '../_helpers/animations';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css', '../_styles/form.styles.css'],
  animations: [FadeIn(200, true)],
})
export class ReportComponent implements OnInit {
  reportParams: ReportParams | undefined;
  reportSections: LayoutSection[] = [];
  reportGenerationComplete: boolean = false;
  reportLayoutSubscription: Subscription = new Subscription();
  selectedClientSubscription: Subscription = new Subscription();
  buildReportObs: Observable<void>;
  glossaryItems: GlossaryItem[] = [];

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

        this.addToGlossary(control);
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

  addToGlossary(control: LayoutControl) {
    const glossaryItem: GlossaryItem | undefined = this.glossaryItems.find(
      (g) => g.name === control.name
    );

    if (!glossaryItem) {
      const newGlossaryItem: GlossaryItem = {
        name: control.name,
        label: control.label,
        description: control.description,
      };
      this.glossaryItems.push(newGlossaryItem);
    }
  }

  exportReportToPDF() {
    this.spinner.show();

    html2canvas(document.body)
      .then((canvas) => {
        const fileNameSuffix = this.getFileNameSuffixDateTime();
        const contentDataURL = canvas.toDataURL('image/jpeg');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const width = pdf.internal.pageSize.getWidth();
        const height = (canvas.height * width) / canvas.width;
        pdf.addImage(contentDataURL, 'JPEG', 0, 0, width, height);
        pdf.save(
          `${this.reportParams?.layout.name}_${this.reportParams?.clientName}_${fileNameSuffix}.pdf`
        );

        this.toastr.success('Report generation complete!');
      })
      .finally(() => {
        this.spinner.hide();
      });
  }

  getFileNameSuffixDateTime(): string {
    const currentDateTime = new Date();
    const year = currentDateTime.getUTCFullYear();
    const month = currentDateTime.getUTCMonth();
    const day = currentDateTime.getUTCDay();
    const hour = currentDateTime.getUTCHours();
    const minute = currentDateTime.getUTCMinutes();
    const second = currentDateTime.getUTCSeconds();

    const fileNameSuffixDateTime: string = `${year}${month}${day}${hour}${minute}${second}`;

    return fileNameSuffixDateTime;
  }
}
