import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ClientService } from '../_services/client.service';
import { Client } from '../_models/client';
import { Subscription, take } from 'rxjs';
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
export class ClientComponent implements OnInit, OnDestroy {
  client: Client | undefined;
  clientsSubscription: Subscription = new Subscription();
  forms: Form[] | undefined;
  formsSubscription: Subscription = new Subscription();
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
    this.clientsSubscription = this.clientService.fetchEntityData().subscribe({
      next: (clients: Client[] | null) => {
        if (clients) {
          let clientId: number = Number(this.route.snapshot.paramMap.get('id'));
          this.client = clients.find((c) => c.id == clientId);
        }
      },
    });

    this.formsSubscription = this.formService.getForms().subscribe({
      next: (forms: Form[] | null) => {
        this.loadingForms = false;
        if (forms) {
          this.forms = forms;
        }
      },
    });
  }

  ngOnDestroy(): void {
    this.formsSubscription.unsubscribe();
    this.clientsSubscription.unsubscribe();
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
              if (selectedForm) {
                this.formService.setReportForm(selectedForm);
                if (this.client) {
                  this.clientService.entitySelected(this.client);
                }

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
