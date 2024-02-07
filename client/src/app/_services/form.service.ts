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
  baseUrl: string = environment.apiUrl;
  user: User | undefined;
  private formsSubject: BehaviorSubject<Form[] | null> = new BehaviorSubject<
    Form[] | null
  >(null);
  private selectedControlSubject: BehaviorSubject<FormControl | null> =
    new BehaviorSubject<FormControl | null>(null);

  forms$ = this.formsSubject.asObservable();
  selectedControl$ = this.selectedControlSubject.asObservable();

  constructor(private http: HttpClient, private userService: UserService) {
    this.userService.currentUser$.pipe(take(1)).subscribe({
      next: (user: User | null) => {
        if (user) {
          this.user = user;
        }
      },
    });
  }

  getForms(): void {
    if (this.user) {
      const params = new HttpParams().set('userId', this.user.id);
      this.http
        .get<Form[]>(`${this.baseUrl}form/templates/`, { params })
        .subscribe((forms: Form[]) => {
          this.formsSubject.next(forms);
        });
    }
  }

  controlSelected(control: FormControl): void {
    this.selectedControlSubject.next(control);
  }

  fetchData(): Observable<Form[] | null> {
    if (this.user) {
      const params = new HttpParams().set('userId', this.user.id);
      return this.http
        .get<Form[]>(`${this.baseUrl}form/templates/`, {
          params,
        })
        .pipe(
          map((forms: Form[]) => {
            this.formsSubject.next(forms);
            return forms;
          })
        );
    } else {
      return of(null);
    }
  }
}
