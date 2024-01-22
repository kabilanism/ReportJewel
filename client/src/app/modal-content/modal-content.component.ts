import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { HttpClient } from '@angular/common/http';
import { EventFormControl } from '../_models/eventFormControl';

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
  eventFormControls: EventFormControl[] = [];

  constructor(
    public bsModalRef: BsModalRef,
    private formBuilder: FormBuilder,
    private http: HttpClient
  ) {
    this.eventEditorForm = new FormGroup({});
  }

  ngOnInit() {
    this.getFormControls();
  }

  getFormControls() {
    this.http
      .get<EventFormControl[]>('assets/sample-form-control.json')
      .subscribe({
        next: (data: EventFormControl[]) => {
          let formGroupConfig: { [key: string]: string } = {};

          this.eventFormControls = data;

          this.eventFormControls.map((formControl) => {
            formGroupConfig[formControl.formControlName] = '';
          });
          this.eventEditorForm = this.formBuilder.group(formGroupConfig);
        },
        error: (error) => {
          console.error(error);
        },
      });
  }

  onSubmit(form: FormGroup) {
    console.log(form.value);
  }
}
