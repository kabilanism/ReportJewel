import { Component, OnInit, ViewChild } from '@angular/core';
import { ClientService } from '../_services/client.service';
import { Client } from '../_models/client';
import { take } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Form } from '../_models/form';
import { FormService } from '../_services/form.service';
import { ExcelService } from '../_services/excel.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css', '../_styles/form.styles.css'],
})
export class ClientComponent implements OnInit {
  client: Client | undefined;
  forms: Form[] | undefined;
  loadingForms: boolean = true;
  sourceFile: File | undefined;
  selectedTemplate: string = '';
  @ViewChild('generateReportForm') generateReportForm: NgForm | undefined;

  constructor(
    private clientService: ClientService,
    public formService: FormService,
    private route: ActivatedRoute,
    private excelService: ExcelService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.clientService.entities$.pipe(take(1)).subscribe({
      next: (clients: Client[]) => {
        let clientId: number = Number(this.route.snapshot.paramMap.get('id'));
        this.client = clients.find((c) => c.id == clientId);
      },
    });

    this.formService.forms$.pipe(take(1)).subscribe({
      next: (forms: Form[] | null) => {
        if (!forms) {
          this.formService
            .fetchData()
            .pipe(take(1))
            .subscribe({
              next: (forms: Form[] | null) => {
                this.loadingForms = false;
                if (forms) {
                  this.forms = forms;
                }
              },
            });
        } else {
          this.loadingForms = false;
          this.forms = forms;
        }
      },
    });
  }

  onFileChange(event: any) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      this.sourceFile = fileList[0];
    }
  }

  generateReport() {
    if (this.generateReportForm) {
      const templateId = this.generateReportForm.value.selectedTemplate;
      let selectedForm = this.forms?.find((f) => f.id == templateId);
      if (this.sourceFile && selectedForm) {
        this.excelService
          .readFile(this.sourceFile, selectedForm.controls)
          .subscribe({
            next: () => {
              console.log('hii');
              if (selectedForm) {
                this.formService.setReportForm(selectedForm);
                this.router.navigateByUrl('/report');
              }
            },
            error: (error) => {
              console.error(
                'An error occurred while reading the Excel file.',
                error
              );
            },
          });
      }
    }
  }
}
