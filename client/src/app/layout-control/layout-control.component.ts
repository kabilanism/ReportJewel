import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { LayoutControl } from '../_models/layoutControl';
import { LayoutService } from '../_services/layout.service';
import { Subscription, of, switchMap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Mode } from '../_models/mode';
import { LayoutControlNew } from '../_models/layoutControlNew';

@Component({
  selector: 'app-layout-control',
  templateUrl: './layout-control.component.html',
  styleUrls: ['./layout-control.component.css', '../_styles/form.styles.css'],
})
export class LayoutControlComponent implements OnInit, OnDestroy {
  controlForm: FormGroup;
  control: LayoutControl | undefined;
  mode: Mode | undefined;
  private selectedControlSubscription: Subscription;
  private controlModeSubscription: Subscription;
  private layoutId: number | undefined;
  @Output() controlDeleted: EventEmitter<LayoutControl>;
  @Output() controlSaved: EventEmitter<LayoutControl>;
  readonly Mode = Mode;

  constructor(
    private layoutService: LayoutService,
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
    this.controlDeleted = new EventEmitter<LayoutControl>();
    this.controlSaved = new EventEmitter<LayoutControl>();
  }

  ngOnInit(): void {
    this.layoutService.controlMode$
      .pipe(
        switchMap((mode: Mode | null) => {
          if (mode) {
            this.mode = mode;
          }

          if (mode === Mode.Add) {
            this.controlForm.reset();
          } else if (mode === Mode.Edit) {
            return this.layoutService.selectedControl$;
          }

          return of(null);
        })
      )
      .subscribe({
        next: (control: LayoutControl | null) => {
          if (control) {
            this.control = control;
            this.setControlValuesInLayout();
          }
        },
      });

    this.layoutId = Number(this.route.snapshot.paramMap.get('id'));
  }

  ngOnDestroy(): void {
    this.selectedControlSubscription.unsubscribe();
    this.controlModeSubscription.unsubscribe();
  }

  setControlValuesInLayout(): void {
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
    const updatedControl: LayoutControl = {
      id: this.control?.id,
      ...this.controlForm?.value,
    };

    if (this.control && this.layoutId) {
      this.layoutService.updateControl(updatedControl).subscribe({
        next: (_) => {
          this.control = updatedControl;
          this.controlSaved.emit(updatedControl);
          this.toastr.success('Control updated successfully.');
        },
        error: (error) => {
          console.error(error);
          this.toastr.error(error);
        },
      });
    }
  }

  addControl(): void {
    if (this.layoutId) {
      const newControl: LayoutControlNew = {
        layoutId: this.layoutId,
        ...this.controlForm?.value,
      };

      this.layoutService.addControl(newControl).subscribe({
        next: (addedControl: LayoutControl) => {
          this.controlSaved.emit(addedControl);
          this.toastr.success('Control added successfully.');

          this.controlForm.reset();
        },
        error: (error) => {
          console.error(error);
          this.toastr.error('An error occurred while adding the control.');
        },
      });
    }
  }

  deleteControl(): void {
    if (this.layoutId && this.control) {
      this.layoutService.deleteControl(this.control.id).subscribe({
        next: (_) => {
          this.controlDeleted.emit(this.control);
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
