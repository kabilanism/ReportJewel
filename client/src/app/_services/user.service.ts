import { Injectable } from '@angular/core';
import { User } from '../_models/user';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { RegisterUser } from '../_models/registerUser';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseUrl: string = environment.apiUrl;
  private currentUserSource: BehaviorSubject<User | null> =
    new BehaviorSubject<User | null>(null);
  currentUser$: Observable<User | null> = this.currentUserSource.asObservable();

  constructor(private http: HttpClient) {}

  register(registerUser: RegisterUser): Observable<User> {
    return this.http
      .post<User>(`${this.baseUrl}user/register`, registerUser)
      .pipe(
        map((user: User) => {
          this.setCurrentUser(user);
          return user;
        })
      );
  }

  login(model: any): Observable<void> {
    return this.http.post<User>(`${this.baseUrl}user/login`, model).pipe(
      map((user: User) => {
        this.setCurrentUser(user);
      })
    );
  }

  setCurrentUser(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSource.next(user);
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
  }
}
