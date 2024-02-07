import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from '../_models/user';
import { UserService } from './user.service';
import { BehaviorSubject, take } from 'rxjs';

export class EntityService<T> {
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

  fetchEntityData(): void {
    console.log('url is: ', `${this.baseUrl}${this.fetchUrl}${this.user?.id}`);
    this.http
      .get<T[]>(`${this.baseUrl}${this.fetchUrl}${this.user?.id}`)
      .subscribe((clients: T[]) => {
        console.log(clients);
        this.entitiesSubject.next(clients);
      });
  }

  entitySelected(entity: T): void {
    this.selectedEntitySubject.next(entity);
  }
}
