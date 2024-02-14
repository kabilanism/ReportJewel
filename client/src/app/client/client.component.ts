import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ClientService } from '../_services/client.service';
import { Client } from '../_models/client';
import { Subscription, take } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Layout } from '../_models/layout';
import { LayoutService } from '../_services/layout.service';
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
  layouts: Layout[] | undefined;
  layoutsSubscription: Subscription = new Subscription();
  loadingLayouts: boolean = true;
  sourceFile: File | undefined;
  selectedLayout: string = '';
  @ViewChild('generateReportForm') generateReportForm: NgForm | undefined;

  constructor(
    private clientService: ClientService,
    public layoutService: LayoutService,
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

    this.layoutsSubscription = this.layoutService.getLayouts().subscribe({
      next: (layouts: Layout[] | null) => {
        this.loadingLayouts = false;
        if (layouts) {
          this.layouts = layouts;
        }
      },
    });
  }

  ngOnDestroy(): void {
    this.layoutsSubscription.unsubscribe();
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
      const templateId = this.generateReportForm.value.selectedLayout;
      let selectedLayout = this.layouts?.find((f) => f.id == templateId);
      if (this.sourceFile && selectedLayout) {
        this.excelService
          .readFile(this.sourceFile, selectedLayout.controls)
          .subscribe({
            next: () => {
              if (selectedLayout) {
                this.layoutService.setReportLayout(selectedLayout);
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
