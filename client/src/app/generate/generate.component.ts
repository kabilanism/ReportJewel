import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription, generate } from 'rxjs';
import { Router } from '@angular/router';
import { Layout } from '../_models/layout';
import { LayoutService } from '../_services/layout.service';
import { ExcelService } from '../_services/excel.service';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { UserParams } from '../_models/userParams';
import { ToastrService } from 'ngx-toastr';

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
  generateForm: FormGroup;
  userParams: UserParams;

  constructor(
    public layoutService: LayoutService,
    private excelService: ExcelService,
    private router: Router,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) {
    this.generateForm = this.formBuilder.group({
      layout: ['', Validators.required],
      clientName: ['', Validators.required],
    });

    this.userParams = { pageNumber: 1, pageSize: 1000 };
  }

  ngOnInit(): void {
    this.layoutsSubscription = this.layoutService
      .getLayouts(this.userParams)
      .subscribe({
        next: (response) => {
          this.loadingLayouts = false;
          if (response.result) {
            this.layouts = response.result;
          }
        },
        error: (error) => {
          this.toastr.error(`Error occurred fetching layouts. ${error}`);
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
    if (this.generateForm.valid) {
      const generateForm: { layout: number; clientName: string } = {
        layout: this.generateForm.get('layout')?.value.toString(),
        clientName: this.generateForm.get('clientName')?.value.toString(),
      };

      let selectedLayout = this.layouts?.find(
        (f) => f.id == generateForm.layout
      );
      if (this.sourceFile && selectedLayout) {
        this.excelService
          .readFile(this.sourceFile, selectedLayout.controls)
          .subscribe({
            next: () => {
              if (selectedLayout) {
                this.layoutService.setReportReportParams({
                  layout: selectedLayout,
                  clientName: generateForm.clientName,
                });
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
