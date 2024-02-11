import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '../_models/formControl';
import { FormService } from '../_services/form.service';
import { take } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Form } from '../_models/form';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-control',
  templateUrl: './form-control.component.html',
  styleUrls: ['./form-control.component.css', '../_styles/form.styles.css'],
})
export class FormControlComponent implements OnInit {
  controlForm: FormGroup;
  @Input() parentForm: Form | undefined;
  control: FormControl | undefined;
  inputTypes: string[] = [
    'button',
    'checkbox',
    'color',
    'date',
    'email',
    'file',
    'image',
    'number',
    'password',
    'radio',
    'range',
    'text',
    'time',
    'url',
    'week',
  ];

  constructor(
    private formService: FormService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private formBuilder: FormBuilder
  ) {
    this.controlForm = this.formBuilder.group({
      type: [''],
      name: [''],
      description: [''],
      placeholder: [''],
      label: [''],
      section: [''],
      row: [''],
      cellSource: [''],
      order: [''],
      required: [''],
    });
  }

  ngOnInit(): void {
    this.formService.selectedControl$.subscribe({
      next: (index: number | null) => {
        if (index !== null && this.parentForm) {
          this.control = this.parentForm.controls[index];
          this.setControlValuesInForm();
        }
      },
    });
  }

  setControlValuesInForm(): void {
    this.controlForm.get('type')?.setValue(this.control?.type);
    this.controlForm.get('name')?.setValue(this.control?.name);
    this.controlForm.get('description')?.setValue(this.control?.description);
    this.controlForm.get('placeholder')?.setValue(this.control?.placeholder);
    this.controlForm.get('label')?.setValue(this.control?.label);
    this.controlForm.get('section')?.setValue(this.control?.section);
    this.controlForm.get('row')?.setValue(this.control?.row);
    this.controlForm.get('cellSource')?.setValue(this.control?.cellSource);
    this.controlForm.get('order')?.setValue(this.control?.order);
    this.controlForm.get('required')?.setValue(this.control?.required);
  }

  updateControl(): void {
    const updatedControl = { id: this.control?.id, ...this.controlForm?.value };

    if (this.control) {
      let formId = Number(this.route.snapshot.paramMap.get('formId'));
      this.formService.updateControl(formId, updatedControl).subscribe({
        next: (updatedControl: FormControl) => {
          this.control = updatedControl;
          this.toastr.success('Field updated successfully.');
        },
        error: (error) => {
          console.log(error);
        },
      });
    }
  }
}
