import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Layout } from '../_models/layout';
import { LayoutService } from '../_services/layout.service';
import { ExcelService } from '../_services/excel.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-generate',
  templateUrl: './generate.component.html',
  styleUrls: ['./generate.component.css', '../_styles/form.styles.css'],
})
export class GenerateComponent implements OnInit, OnDestroy {
  layouts: Layout[] | undefined;
  layoutsSubscription: Subscription = new Subscription();
  loadingLayouts: boolean = true;
  sourceFile: File | undefined;
  selectedLayout: string = '';
  clientName: string = '';
  @ViewChild('generateReportForm') generateReportForm: NgForm | undefined;

  constructor(
    public layoutService: LayoutService,
    private excelService: ExcelService,
    private router: Router
  ) {}

  ngOnInit(): void {
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
