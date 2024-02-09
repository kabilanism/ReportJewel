import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from '../_models/user';
import { UserService } from './user.service';
import { BehaviorSubject, Observable, map, of, take } from 'rxjs';

export class EntityService<T> {
  entities: T[] = [];
  baseUrl: string = environment.apiUrl;
  user: User | undefined;
  private entitiesSubject: BehaviorSubject<T[]> = new BehaviorSubject<T[]>([]);
  private selectedEntitySubject: BehaviorSubject<T | null> =
    new BehaviorSubject<T | null>(null);
  entities$ = this.entitiesSubject.asObservable();
  selectedEntity$ = this.selectedEntitySubject.asObservable();
  fetchUrl: string | undefined;

  constructor(private http: HttpClient, private userService: UserService) {
    this.userService.currentUser$.pipe(take(1)).subscribe({
      next: (user: User | null) => {
        if (user) {
          this.user = user;
        }
      },
    });
  }

  fetchEntityData(): Observable<T[] | null> {
    if (this.user) {
      if (this.entities.length > 0) {
        return of(this.entities.slice());
      }

      const params = new HttpParams().set('userId', this.user.id);
      return this.http
        .get<T[]>(`${this.baseUrl}${this.fetchUrl}`, {
          params,
        })
        .pipe(
          map((entities: T[]) => {
            this.entities = entities;
            return this.entities.slice();
          })
        );
    } else {
      return of(null);
    }
  }

  entitySelected(entity: T): void {
    this.selectedEntitySubject.next(entity);
  }
}
