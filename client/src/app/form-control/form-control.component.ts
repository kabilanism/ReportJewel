import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '../_models/formControl';
import { FormService } from '../_services/form.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ControlMode } from '../_models/controlMode';
import { FormControlNew } from '../_models/formControlNew';

@Component({
  selector: 'app-form-control',
  templateUrl: './form-control.component.html',
  styleUrls: ['./form-control.component.css', '../_styles/form.styles.css'],
})
export class FormControlComponent implements OnInit, OnDestroy {
  controlForm: FormGroup;
  control: FormControl | undefined;
  mode: ControlMode | undefined;
  addMode: boolean = false;
  private selectedControlSubscription: Subscription;
  private controlModeSubscription: Subscription;
  private formId: number | undefined;

  constructor(
    private formService: FormService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private formBuilder: FormBuilder
  ) {
    this.controlForm = this.formBuilder.group({
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

    this.selectedControlSubscription = new Subscription();
    this.controlModeSubscription = new Subscription();
  }

  ngOnInit(): void {
    this.formService.controlMode$.subscribe({
      next: (mode: ControlMode | null) => {
        if (mode) {
          this.mode = mode;
        }

        if (this.mode == ControlMode.Edit) {
          this.selectedControlSubscription = this.getSelectedControl();
        } else if (this.mode == ControlMode.Add) {
          this.addMode = true;
          this.controlForm.reset();
        }
      },
    });

    this.formId = Number(this.route.snapshot.paramMap.get('formId'));
  }

  getSelectedControl() {
    return this.formService.selectedControl$.subscribe({
      next: (control: FormControl | null) => {
        if (control) {
          this.control = control;
          this.setControlValuesInForm();
        }
      },
    });
  }

  ngOnDestroy(): void {
    this.selectedControlSubscription.unsubscribe();
    this.controlModeSubscription.unsubscribe();
  }

  setControlValuesInForm(): void {
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
    const updatedControl: FormControl = {
      id: this.control?.id,
      ...this.controlForm?.value,
    };

    if (this.control && this.formId) {
      this.formService.updateControl(this.formId, updatedControl).subscribe({
        next: (updatedControl: FormControl) => {
          this.control = updatedControl;
          this.toastr.success('Control updated successfully.');
        },
        error: (error) => {
          console.log(error);
        },
      });
    }
  }

  addControl(): void {
    if (this.formId) {
      const newControl: FormControlNew = {
        formId: this.formId,
        ...this.controlForm?.value,
      };

      this.formService.addControl(newControl).subscribe({
        next: (addedControl: FormControl) => {
          this.control = addedControl;
          this.toastr.success('Control added successfully.');
          this.addMode = false;
        },
        error: (error) => {
          console.error(error);
          this.toastr.error('An error occurred while adding the control.');
        },
      });
    }
  }

  saveControl(): void {
    if (this.mode === ControlMode.Add) {
      this.addControl();
    } else if (this.mode === ControlMode.Edit) {
      this.updateControl();
    }
  }
}
