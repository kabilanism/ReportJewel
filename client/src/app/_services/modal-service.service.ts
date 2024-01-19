import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private showModalSubject = new Subject<void>();

  constructor() {}

  loadModal(): Observable<void> {
    return this.showModalSubject.asObservable();
  }

  showModal() {
    this.showModalSubject.next();
  }
}
