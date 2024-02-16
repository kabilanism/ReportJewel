import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../_services/layout.service';
import { Subscription, take } from 'rxjs';
import { Layout } from '../_models/layout';
import { LayoutRow, LayoutSection } from '../_models/layoutControl';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css', '../_styles/form.styles.css'],
})
export class ReportComponent implements OnInit {
  reportLayout: Layout | undefined;
  reportSections: LayoutSection[] = [];
  reportGenerationComplete: boolean = false;
  reportLayoutSubscription: Subscription = new Subscription();
  selectedClientSubscription: Subscription = new Subscription();

  constructor(private layoutService: LayoutService) {}

  ngOnInit(): void {
    this.layoutService.reportLayout$.pipe(take(1)).subscribe({
      next: (reportLayout: Layout | null) => {
        if (reportLayout) {
          this.reportLayout = reportLayout;
          this.buildReport();
        }
      },
    });
  }

  buildReport() {
    if (this.reportLayout) {
      this.reportLayout.controls.forEach((control) => {
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

      this.reportGenerationComplete = true;
    }
  }
}
