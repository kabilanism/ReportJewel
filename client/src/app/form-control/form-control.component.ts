import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '../_models/formControl';
import { FormService } from '../_services/form.service';
import { take } from 'rxjs';

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

  constructor(private formService: FormService) {}

  ngOnInit(): void {
    this.formService.selectedControl$.pipe(take(1)).subscribe((control) => {
      if (control) {
        this.control = control;
      }
    });
  }

  updateControl(): void {}
}
