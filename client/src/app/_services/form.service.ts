import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Form } from '../_models/form';
import { UserService } from './user.service';
import { User } from '../_models/user';
import { BehaviorSubject, Observable, Subject, map, of, take } from 'rxjs';
import { FormControl } from '../_models/formControl';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  forms: Form[] = [];
  baseUrl: string = environment.apiUrl;
  user: User | undefined;
  private reportFormSubject: BehaviorSubject<Form | null> =
    new BehaviorSubject<Form | null>(null);
  private selectedControlSubject: BehaviorSubject<FormControl | null> =
    new BehaviorSubject<FormControl | null>(null);

  selectedControl$ = this.selectedControlSubject.asObservable();
  reportForm$ = this.reportFormSubject.asObservable();

  constructor(private http: HttpClient, private userService: UserService) {
    this.userService.currentUser$.pipe(take(1)).subscribe({
      next: (user: User | null) => {
        if (user) {
          this.user = user;
        }
      },
    });
  }

  getForms(): Observable<Form[] | null> {
    if (this.user) {
      if (this.forms.length > 0) {
        return of(this.forms.slice());
      }

      const params = new HttpParams().set('userId', this.user.id);
      return this.http
        .get<Form[]>(`${this.baseUrl}form/templates/`, {
          params,
        })
        .pipe(
          map((forms: Form[]) => {
            this.forms = forms;
            return this.forms.slice();
          })
        );
    } else {
      return of(null);
    }
  }

  getForm(formId: number): Observable<Form | null> {
    if (this.user && this.forms) {
      if (this.forms.length > 0) {
        let form: Form | undefined = this.forms.find(
          (form) => form.id == formId
        );
        if (form) {
          return of(form);
        }
        return this.fetchForm(formId);
      }
      return this.fetchForm(formId);
    }

    return of(null);
  }

  fetchForm(formId: number): Observable<Form> {
    return this.http.get<Form>(`${this.baseUrl}form/templates/${formId}`).pipe(
      map((form: Form) => {
        const index = this.forms.indexOf(form);
        if (index == -1) {
          this.forms.push(form);
        }
        return form;
      })
    );
  }

  updateForm(form: Form): Observable<void> {
    return this.http.put<Form>(`${this.baseUrl}form/update`, form).pipe(
      map(() => {
        const index = this.forms.findIndex((f) => f.id == form.id);
        this.forms[index] = { ...this.forms[index], ...form };
      })
    );
  }

  updateControl(formId: number, control: FormControl) {
    return this.http
      .put<FormControl>(`${this.baseUrl}form/control/update`, control)
      .pipe(
        map(() => {
          const formIndex = this.forms.findIndex((f) => f.id == formId);
          const controlIndex = this.forms[formIndex].controls.findIndex(
            (c) => c.id == control.id
          );
          const updatedControl = {
            ...this.forms[formIndex].controls[controlIndex],
            ...control,
          };

          this.forms[formIndex].controls[controlIndex] = updatedControl;
        })
      );
  }

  controlSelected(control: FormControl): void {
    this.selectedControlSubject.next(control);
  }

  setReportForm(form: Form): void {
    this.reportFormSubject.next(form);
  }
}
