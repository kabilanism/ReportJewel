import { Component, OnInit } from '@angular/core';
import { FormService } from '../_services/form.service';
import { Subscription, take } from 'rxjs';
import { Form } from '../_models/form';
import { FormRow, FormSection } from '../_models/formControl';
import { ClientService } from '../_services/client.service';
import { Client } from '../_models/client';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css', '../_styles/form.styles.css'],
})
export class ReportComponent implements OnInit {
  reportForm: Form | undefined;
  reportClient: Client | undefined;
  reportSections: FormSection[] = [];
  reportGenerationComplete: boolean = false;
  reportFormSubscription: Subscription = new Subscription();
  selectedClientSubscription: Subscription = new Subscription();

  constructor(
    private formService: FormService,
    private clientService: ClientService
  ) {}

  ngOnInit(): void {
    this.formService.reportForm$.pipe(take(1)).subscribe({
      next: (reportForm: Form | null) => {
        if (reportForm) {
          this.reportForm = reportForm;
          this.buildReport();
        }
      },
    });

    this.clientService.selectedEntity$.pipe(take(1)).subscribe({
      next: (client: Client | null) => {
        if (client) {
          this.reportClient = client;
        }
      },
    });
  }

  buildReport() {
    if (this.reportForm) {
      this.reportForm.controls.forEach((control) => {
        let section: FormSection | undefined;
        let row: FormRow | undefined;

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
