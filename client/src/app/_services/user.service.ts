import { Injectable } from '@angular/core';
import { User } from '../_models/user';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseUrl: string = environment.apiUrl;
  private currentUserSource: BehaviorSubject<User | null> =
    new BehaviorSubject<User | null>(null);
  currentUser$: Observable<User | null> = this.currentUserSource.asObservable();

  constructor(private http: HttpClient) {}

  login(model: any): Observable<void> {
    return this.http.post<User>(`${this.baseUrl}user/login`, model).pipe(
      map((user: User) => {
        if (user) {
          console.log(user);
          this.setCurrentUser(user);
        }
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
