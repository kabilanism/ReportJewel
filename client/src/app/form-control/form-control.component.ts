import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl } from '../_models/formControl';
import { FormService } from '../_services/form.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Mode } from '../_models/mode';
import { FormControlNew } from '../_models/formControlNew';

@Component({
  selector: 'app-form-control',
  templateUrl: './form-control.component.html',
  styleUrls: ['./form-control.component.css', '../_styles/form.styles.css'],
})
export class FormControlComponent implements OnInit, OnDestroy {
  controlForm: FormGroup;
  control: FormControl | undefined;
  mode: Mode | undefined;
  private selectedControlSubscription: Subscription;
  private controlModeSubscription: Subscription;
  private formId: number | undefined;
  @Output() controlDeleted: EventEmitter<void>;
  readonly Mode = Mode;

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
    this.controlDeleted = new EventEmitter<void>();
  }

  ngOnInit(): void {
    this.formService.controlMode$.subscribe({
      next: (mode: Mode | null) => {
        if (mode) {
          this.mode = mode;
        }

        if (this.mode == Mode.Edit) {
          this.selectedControlSubscription = this.getSelectedControl();
        } else if (this.mode == Mode.Add) {
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
        },
        error: (error) => {
          console.error(error);
          this.toastr.error('An error occurred while adding the control.');
        },
      });
    }
  }

  deleteControl(): void {
    if (this.formId && this.control) {
      this.formService.deleteControl(this.formId, this.control.id).subscribe({
        next: (_) => {
          this.controlDeleted.emit();
          this.toastr.success('Control deleted successfully.');
        },
        error: (error) => {
          console.error(error);
          this.toastr.error('An error occurred while deleting the control.');
        },
      });
    }
  }

  saveControl(): void {
    if (this.mode === Mode.Add) {
      this.addControl();
    } else if (this.mode === Mode.Edit) {
      this.updateControl();
    }
  }
}
