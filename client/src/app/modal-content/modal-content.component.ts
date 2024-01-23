import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { HttpClient } from '@angular/common/http';
import { EventFormControl } from '../_models/eventFormControl';
import { FormControlService } from '../_services/form-control-service.service';

@Component({
  selector: 'app-modal-content',
  templateUrl: './modal-content.component.html',
  styleUrls: ['./modal-content.component.css'],
})
export class ModalContentComponent implements OnInit {
  title?: string;
  closeBtnName?: string;
  list: string[] = [];
  eventEditorForm: FormGroup;
  eventFormControls: EventFormControl[] | undefined;

  constructor(
    public bsModalRef: BsModalRef,
    private formBuilder: FormBuilder,
    private formControlService: FormControlService
  ) {
    this.eventEditorForm = new FormGroup({});
  }

  ngOnInit() {
    this.initializeFormControls();
  }

  initializeFormControls(): void {
    this.formControlService.getFormControls().subscribe({
      next: (formControls: EventFormControl[]) => {
        this.eventEditorForm = this.formBuilder.group(
          this.setFormConfig(formControls)
        );
      },
    });
  }

  private setFormConfig(formControls: EventFormControl[]): {
    [key: string]: string;
  } {
    let formConfig: { [key: string]: string } = {};

    this.eventFormControls = formControls;
    this.eventFormControls.map((formControl) => {
      formConfig[formControl.formControlName] = '';
    });

    return formConfig;
  }

  onSubmit(form: FormGroup) {
    console.log(form.value);
  }

  onReset() {
    this.eventEditorForm.reset();
  }
}
