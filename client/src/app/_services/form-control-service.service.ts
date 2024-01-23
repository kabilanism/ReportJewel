import { Injectable } from '@angular/core';
import { EventFormControl } from '../_models/eventFormControl';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FormControlService {
  eventFormControls: EventFormControl[] = [];

  constructor(private http: HttpClient) {}

  getFormControls(): Observable<EventFormControl[]> {
    return this.http
      .get<EventFormControl[]>('assets/sample-form-control.json')
      .pipe(
        map((formControls: EventFormControl[]) => {
          formControls = formControls.sort(
            (a: EventFormControl, b: EventFormControl) => {
              return a.order - b.order;
            }
          );

          return formControls;
        })
      );
  }
}
