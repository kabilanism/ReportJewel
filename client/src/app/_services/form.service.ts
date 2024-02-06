import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Form } from '../_models/form';
import { UserService } from './user.service';
import { User } from '../_models/user';
import { BehaviorSubject, Subject, map, take } from 'rxjs';
import { FormControl } from '../_models/formControl';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  baseUrl: string = environment.apiUrl;
  user: User | undefined;
  private formsSubject: BehaviorSubject<Form[]> = new BehaviorSubject<Form[]>(
    []
  );
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
    this.http
      .get<Form[]>(`${this.baseUrl}form/GetForms/${this.user?.id}`)
      .subscribe((forms: Form[]) => {
        this.formsSubject.next(forms);
      });
  }

  controlSelected(control: FormControl): void {
    this.selectedControlSubject.next(control);
  }

  updateForm() {}
}
