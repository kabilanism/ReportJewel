import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Layout } from '../_models/layout';
import { UserService } from './user.service';
import { User } from '../_models/user';
import { BehaviorSubject, Observable, map, of } from 'rxjs';
import { LayoutControl } from '../_models/layoutControl';
import { LayoutNew } from '../_models/layoutNew';
import { Mode } from '../_models/mode';
import { LayoutControlNew } from '../_models/layoutControlNew';
import { ReportParams } from '../_models/reportParams';
import { UserParams } from '../_models/userParams';
import {
  getPaginatedResult,
  getPaginationHeaders,
} from '../_helpers/paginationHelper';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  public layouts: Layout[] = [];
  private layoutCache = new Map();
  private baseUrl: string = environment.apiUrl;
  private userParams: UserParams | undefined;

  private reportParamsSubject: BehaviorSubject<ReportParams | null> =
    new BehaviorSubject<ReportParams | null>(null);
  private selectedControlSubject: BehaviorSubject<LayoutControl | null> =
    new BehaviorSubject<LayoutControl | null>(null);
  private layoutModeSubject: BehaviorSubject<Mode> = new BehaviorSubject<Mode>(
    Mode.Edit
  );
  private controlModeSubject: BehaviorSubject<Mode | null> =
    new BehaviorSubject<Mode | null>(null);

  reportParams$ = this.reportParamsSubject.asObservable();
  selectedControl$ = this.selectedControlSubject.asObservable();
  layoutMode$ = this.layoutModeSubject.asObservable();
  controlMode$ = this.controlModeSubject.asObservable();

  constructor(private http: HttpClient, private userService: UserService) {
    this.userService.currentUser$.subscribe({
      next: (user: User | null) => {
        if (user) {
          this.userParams = new UserParams();
        }
      },
    });
  }

  getLayouts(userParams: UserParams) {
    const response = this.layoutCache.get(Object.values(userParams).join('-'));
    if (response) {
      return of(response);
    }

    let params = getPaginationHeaders(
      userParams.pageNumber,
      userParams.pageSize
    );

    return getPaginatedResult<Layout[]>(
      `${this.baseUrl}layout/list`,
      params,
      this.http
    ).pipe(
      map((response) => {
        this.layoutCache.set(Object.values(userParams).join('-'), response);
        return response;
      })
    );
  }

  getLayout(layoutId: number) {
    const layout = [...this.layoutCache.values()]
      .reduce((arr, elem) => arr.concat(elem.result), [])
      .find((layout: Layout) => {
        return layout.id === layoutId;
      });

    if (layout) {
      return of(layout);
    }

    return this.http.get<Layout>(`${this.baseUrl}layout/${layoutId}`);
  }

  updateLayout(updatedLayout: Layout): Observable<Layout> {
    return this.http.put<Layout>(`${this.baseUrl}layout/update`, updatedLayout);
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
    return this.http.post<LayoutControl>(
      `${this.baseUrl}layout/control/add`,
      controlNew
    );
  }

  updateControl(control: LayoutControl) {
    return this.http.put<LayoutControl>(
      `${this.baseUrl}layout/control/update`,
      control
    );
  }

  deleteControl(controlId: number) {
    return this.http.delete(
      `${this.baseUrl}layout/control/delete/${controlId}`
    );
  }

  setSelectedControl(control: LayoutControl): void {
    this.selectedControlSubject.next(control);
  }

  setReportReportParams(reportParams: ReportParams): void {
    this.reportParamsSubject.next(reportParams);
  }

  setControlMode(mode: Mode) {
    this.controlModeSubject.next(mode);
  }

  setLayoutMode(mode: Mode) {
    this.layoutModeSubject.next(mode);
  }

  getUserParams() {
    return this.userParams;
  }

  resetCache() {
    this.layoutCache.clear();
  }
}
