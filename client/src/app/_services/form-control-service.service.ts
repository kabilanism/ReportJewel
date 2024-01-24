import { Injectable } from '@angular/core';
import { FormControl } from '../_models/formControl';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FormControlService {
  formControls: FormControl[] = [];

  constructor(private http: HttpClient) {}

  getFormControls(): Observable<FormControl[]> {
    return this.http.get<FormControl[]>('assets/sample-form-control.json').pipe(
      map((formControls: FormControl[]) => {
        formControls = formControls.sort((a: FormControl, b: FormControl) => {
          return a.order - b.order;
        });

        formControls.forEach((formControl) => {
          switch (formControl.type) {
            case 'text':
              formControl.iconClass = 'bi bi-card-text';
              break;
            default:
              break;
          }
        });

        this.formControls = formControls;
        this.setIconClass();

        return this.formControls;
      })
    );
  }

  setIconClass() {
    const iconClassBase: string = 'bi';

    this.formControls.forEach((formControl) => {
      switch (formControl.type) {
        case 'text':
          formControl.iconClass = `${iconClassBase} bi-card-text`;
          break;
        case 'textarea':
          formControl.iconClass = `${iconClassBase} bi-body-text`;
          break;
        case 'password':
          formControl.iconClass = `${iconClassBase} bi-pass`;
          break;
        case 'checkbox':
          formControl.iconClass = `${iconClassBase} bi-check2-square`;
          break;
        case 'radio':
          formControl.iconClass = `${iconClassBase} bi-ui-radios-grid`;
          break;
        case 'select':
          formControl.iconClass = `${iconClassBase} bi-menu-button`;
          break;
        case 'file':
          formControl.iconClass = `${iconClassBase} bi-file-binary`;
          break;
        case 'range':
          formControl.iconClass = `${iconClassBase} bi-123`;
          break;
        case 'date':
          formControl.iconClass = `${iconClassBase} bi-calendar-day`;
          break;
        case 'color':
          formControl.iconClass = `${iconClassBase} bi-palette`;
          break;
        case 'email':
          formControl.iconClass = `${iconClassBase} bi-envelope`;
          break;
        case 'tel':
          formControl.iconClass = `${iconClassBase} bi-telephone`;
          break;
        default:
          formControl.iconClass = `${iconClassBase} bi-card-text`;
          break;
      }
    });
  }
}
