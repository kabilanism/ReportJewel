import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Form } from '../_models/form';
import { UserService } from './user.service';
import { User } from '../_models/user';
import { BehaviorSubject, Observable, Subject, map, of, take } from 'rxjs';
import { FormControl } from '../_models/formControl';
import { FormNew } from '../_models/formNew';
import { Mode } from '../_models/mode';
import { FormControlNew } from '../_models/formControlNew';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  forms: Form[] = [];
  baseUrl: string = environment.apiUrl;
  user: User | undefined;

  private formsSubject: BehaviorSubject<Form[] | null> = new BehaviorSubject<
    Form[] | null
  >(null);
  private reportFormSubject: BehaviorSubject<Form | null> =
    new BehaviorSubject<Form | null>(null);
  private selectedControlSubject: BehaviorSubject<FormControl | null> =
    new BehaviorSubject<FormControl | null>(null);
  private controlModeSubject: BehaviorSubject<Mode | null> =
    new BehaviorSubject<Mode | null>(null);

  forms$ = this.formsSubject.asObservable();
  reportForm$ = this.reportFormSubject.asObservable();
  selectedControl$ = this.selectedControlSubject.asObservable();
  controlMode$ = this.controlModeSubject.asObservable();

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
        const form: Form | undefined = this.forms.find(
          (form) => form.id == formId
        );
        if (form) {
          return of(form);
        }
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

  updateForm(updatedForm: Form): Observable<Form> {
    return this.http.put<Form>(`${this.baseUrl}form/update`, updatedForm).pipe(
      map(() => {
        const forms = this.forms.slice();
        const index = forms.findIndex((f) => f.id == updatedForm.id);
        const form = { ...forms[index], ...updatedForm };

        forms[index] = form;
        this.forms = forms;

        return form;
      })
    );
  }

  addForm(form: FormNew): Observable<Form> {
    return this.http.post<Form>(`${this.baseUrl}form/add`, form).pipe(
      map((addedForm: Form) => {
        this.forms.push(addedForm);
        return addedForm;
      })
    );
  }

  deleteForm(form: Form): Observable<void> {
    return this.http.delete(`${this.baseUrl}form/delete/${form.id}`).pipe(
      map(() => {
        let forms = this.forms.slice();
        const formIndex = this.forms.indexOf(form);
        forms.splice(formIndex, 1);

        this.forms = forms;
      })
    );
  }

  addControl(controlNew: FormControlNew): Observable<FormControl> {
    return this.http
      .post<FormControl>(`${this.baseUrl}form/control/add`, controlNew)
      .pipe(
        map((addedControl: FormControl) => {
          const forms = this.forms.slice();
          const form = forms.find((f) => f.id == controlNew.formId);
          if (form) {
            form.controls.push(addedControl);
          }
          this.forms = forms;

          return addedControl;
        })
      );
  }

  updateControl(formId: number, control: FormControl) {
    return this.http
      .put<FormControl>(`${this.baseUrl}form/control/update`, control)
      .pipe(
        map(() => {
          const forms = this.forms.slice();
          const formIndex = forms.findIndex((f) => f.id == formId);
          const controlIndex = forms[formIndex].controls.findIndex(
            (c) => c.id == control.id
          );
          const updatedControl = {
            ...forms[formIndex].controls[controlIndex],
            ...control,
          };

          forms[formIndex].controls[controlIndex] = updatedControl;
          this.forms = forms;

          return updatedControl;
        })
      );
  }

  deleteControl(formId: number, controlId: number) {
    return this.http
      .delete(`${this.baseUrl}form/control/delete/${controlId}`)
      .pipe(
        map(() => {
          let forms = this.forms.slice();
          const formIndex = forms.findIndex((f) => f.id == formId);
          const controlIndex = forms[formIndex].controls.findIndex(
            (c) => c.id == controlId
          );

          forms[formIndex].controls.splice(controlIndex, 1);
          this.forms = forms;
        })
      );
  }

  setSelectedControl(control: FormControl): void {
    this.selectedControlSubject.next(control);
  }

  setReportForm(form: Form): void {
    this.reportFormSubject.next(form);
  }

  setControlMode(mode: Mode) {
    this.controlModeSubject.next(mode);
  }
}
