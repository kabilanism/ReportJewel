import { Component, OnInit } from '@angular/core';
import { FormService } from '../_services/form.service';
import { take } from 'rxjs';
import { Form } from '../_models/form';
import { FormRow, FormSection } from '../_models/formControl';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css', '../_styles/form.styles.css'],
})
export class ReportComponent implements OnInit {
  reportForm: Form | undefined;
  reportSections: FormSection[] = [];

  constructor(private formService: FormService) {}

  ngOnInit(): void {
    this.formService.reportForm$.pipe(take(1)).subscribe({
      next: (reportForm: Form | null) => {
        if (reportForm) {
          this.reportForm = reportForm;
          this.buildReport();
        }
      },
    });
  }

  buildReport() {
    if (this.reportForm) {
      this.reportForm.controls.forEach((control) => {
        let section: FormSection | undefined;
        let row: FormRow | undefined;

        section = this.reportSections.find((section) => {
          section.sectionNumber == control.section;
        });

        if (!section) {
          section = { sectionNumber: control.section, rows: [] };
          this.reportSections.push(section);
        }

        row = section.rows.find((row) => {
          row.rowNumber == control.row;
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
