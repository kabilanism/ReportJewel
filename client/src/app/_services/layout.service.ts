import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Layout } from '../_models/layout';
import { UserService } from './user.service';
import { User } from '../_models/user';
import { BehaviorSubject, Observable, Subject, map, of, take } from 'rxjs';
import { LayoutControl } from '../_models/layoutControl';
import { LayoutNew } from '../_models/layoutNew';
import { Mode } from '../_models/mode';
import { LayoutControlNew } from '../_models/layoutControlNew';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  layouts: Layout[] = [];
  baseUrl: string = environment.apiUrl;
  user: User | undefined;

  private layoutsSubject: BehaviorSubject<Layout[] | null> =
    new BehaviorSubject<Layout[] | null>(null);
  private reportLayoutSubject: BehaviorSubject<Layout | null> =
    new BehaviorSubject<Layout | null>(null);
  private selectedControlSubject: BehaviorSubject<LayoutControl | null> =
    new BehaviorSubject<LayoutControl | null>(null);
  private controlModeSubject: BehaviorSubject<Mode | null> =
    new BehaviorSubject<Mode | null>(null);

  layouts$ = this.layoutsSubject.asObservable();
  reportLayout$ = this.reportLayoutSubject.asObservable();
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

  getLayouts(): Observable<Layout[] | null> {
    if (this.user) {
      if (this.layouts.length > 0) {
        return of(this.layouts.slice());
      }

      const params = new HttpParams().set('userId', this.user.id);
      return this.http
        .get<Layout[]>(`${this.baseUrl}layout/list/`, {
          params,
        })
        .pipe(
          map((layouts: Layout[]) => {
            this.layouts = layouts;

            return this.layouts.slice();
          })
        );
    } else {
      return of(null);
    }
  }

  getLayout(layoutId: number): Observable<Layout | null> {
    if (this.user && this.layouts) {
      if (this.layouts.length > 0) {
        const layout: Layout | undefined = this.layouts.find(
          (layout) => layout.id == layoutId
        );
        if (layout) {
          return of(layout);
        }
      }
      return this.fetchLayout(layoutId);
    }

    return of(null);
  }

  fetchLayout(layoutId: number): Observable<Layout> {
    return this.http.get<Layout>(`${this.baseUrl}layout/${layoutId}`).pipe(
      map((layout: Layout) => {
        const index = this.layouts.indexOf(layout);
        if (index == -1) {
          this.layouts.push(layout);
        }
        return layout;
      })
    );
  }

  updateLayout(updatedLayout: Layout): Observable<Layout> {
    return this.http
      .put<Layout>(`${this.baseUrl}layout/update`, updatedLayout)
      .pipe(
        map(() => {
          const layouts = this.layouts.slice();
          const index = layouts.findIndex((f) => f.id == updatedLayout.id);
          const layout = { ...layouts[index], ...updatedLayout };

          layouts[index] = layout;
          this.layouts = layouts;

          return layout;
        })
      );
  }

  addLayout(layout: LayoutNew): Observable<Layout> {
    return this.http.post<Layout>(`${this.baseUrl}layout/add`, layout).pipe(
      map((addedLayout: Layout) => {
        this.layouts.push(addedLayout);
        return addedLayout;
      })
    );
  }

  deleteLayout(layout: Layout): Observable<void> {
    return this.http.delete(`${this.baseUrl}layout/delete/${layout.id}`).pipe(
      map(() => {
        let layouts = this.layouts.slice();
        const layoutIndex = this.layouts.indexOf(layout);
        layouts.splice(layoutIndex, 1);

        this.layouts = layouts;
      })
    );
  }

  addControl(controlNew: LayoutControlNew): Observable<LayoutControl> {
    return this.http
      .post<LayoutControl>(`${this.baseUrl}layout/control/add`, controlNew)
      .pipe(
        map((addedControl: LayoutControl) => {
          const layouts = this.layouts.slice();
          const layout = layouts.find((f) => f.id == controlNew.layoutId);
          if (layout) {
            layout.controls.push(addedControl);
          }
          this.layouts = layouts;

          return addedControl;
        })
      );
  }

  updateControl(layoutId: number, control: LayoutControl) {
    return this.http
      .put<LayoutControl>(`${this.baseUrl}layout/control/update`, control)
      .pipe(
        map(() => {
          const layouts = this.layouts.slice();
          const layoutIndex = layouts.findIndex((f) => f.id == layoutId);
          const controlIndex = layouts[layoutIndex].controls.findIndex(
            (c) => c.id == control.id
          );
          const updatedControl = {
            ...layouts[layoutIndex].controls[controlIndex],
            ...control,
          };

          layouts[layoutIndex].controls[controlIndex] = updatedControl;
          this.layouts = layouts;

          return updatedControl;
        })
      );
  }

  deleteControl(layoutId: number, controlId: number) {
    return this.http
      .delete(`${this.baseUrl}layout/control/delete/${controlId}`)
      .pipe(
        map(() => {
          let layouts = this.layouts.slice();
          const layoutIndex = layouts.findIndex((f) => f.id == layoutId);
          const controlIndex = layouts[layoutIndex].controls.findIndex(
            (c) => c.id == controlId
          );

          layouts[layoutIndex].controls.splice(controlIndex, 1);
          this.layouts = layouts;
        })
      );
  }

  setSelectedControl(control: LayoutControl): void {
    this.selectedControlSubject.next(control);
  }

  setReportLayout(layout: Layout): void {
    this.reportLayoutSubject.next(layout);
  }

  setControlMode(mode: Mode) {
    this.controlModeSubject.next(mode);
  }
}