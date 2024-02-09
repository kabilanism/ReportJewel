import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '../_models/formControl';
import { FormService } from '../_services/form.service';
import { take } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Form } from '../_models/form';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-form-control',
  templateUrl: './form-control.component.html',
  styleUrls: ['./form-control.component.css', '../_styles/form.styles.css'],
})
export class FormControlComponent implements OnInit {
  @Input() control: FormControl | undefined;
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
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    console.log('im in the form control component');

    this.formService.getForms().subscribe({
      next: (forms: Form[] | null) => {
        let formId = Number(this.route.snapshot.paramMap.get('formId'));
        let controlId = Number(this.route.snapshot.paramMap.get('controlId'));

        let form = forms?.find((form) => form.id == formId);
        let control = form?.controls.find((control) => control.id == controlId);

        this.control = control;
      },
    });
  }

  updateControl(): void {
    if (this.control) {
      let formId = Number(this.route.snapshot.paramMap.get('formId'));
      this.formService.updateControl(formId, this.control).subscribe({
        next: (_) => {
          this.toastr.success('Control updated successfully.');
        },
      });
    }
  }
}
