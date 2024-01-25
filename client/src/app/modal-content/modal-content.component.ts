import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FormControl } from '../_models/formControl';
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
  formGroup: FormGroup;
  formControls: FormControl[] | undefined;

  constructor(
    public bsModalRef: BsModalRef,
    private formBuilder: FormBuilder,
    private formControlService: FormControlService
  ) {
    this.formGroup = new FormGroup({});
  }

  ngOnInit() {
    this.initializeFormControls();
  }

  onSubmit(formGroup: FormGroup) {
    console.log(formGroup);
  }

  onReset() {
    this.formGroup.reset();
  }

  private initializeFormControls(): void {
    const iconClassBase: string = 'bi';

    this.formControlService.getFormControls().subscribe({
      next: () => {
        this.formGroup = this.formBuilder.group(this.setFormConfig());
      },
    });
  }

  private setFormConfig(): {
    [key: string]: string;
  } {
    let formConfig: { [key: string]: string } = {};

    this.formControls = this.formControlService.formControls.slice();
    this.formControls.map((formControl) => {
      formConfig[formControl.name] = '';
    });

    return formConfig;
  }
}
