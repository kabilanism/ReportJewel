import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import * as XLSX from 'xlsx';
import { LayoutControl } from '../_models/layoutControl';

@Injectable({
  providedIn: 'root',
})
export class ExcelService {
  constructor() {}

  readFile(file: File, controls: LayoutControl[]): Observable<void> {
    return new Observable((observer: Observer<void>) => {
      const fileReader = new FileReader();
      fileReader.onload = (e: any) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];

        controls.forEach((control) => {
          let cellObject: XLSX.CellObject = sheet[control.cellSource];
          control.value = cellObject.v;
        });

        observer.next();
        observer.complete();
      };
      fileReader.onerror = (error) => {
        observer.error(error);
      };
      fileReader.readAsArrayBuffer(file);
    });
  }
}
