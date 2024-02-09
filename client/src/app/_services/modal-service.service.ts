import { Injectable } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  bsModalRef?: BsModalRef;

  constructor(private bsModalService: BsModalService) {}

  openModalWithComponent() {
    // const initialState: ModalOptions = {
    //   initialState: {
    //     list: [
    //       'Open a modal with component',
    //       'Pass your data',
    //       'Do something else',
    //       '...',
    //     ],
    //     title: 'Modal with component',
    //   },
    // };
    // this.bsModalRef = this.bsModalService.show(
    //   ModalContentComponent,
    //   initialState
    // );
    // this.bsModalRef.content.closeBtnName = 'Close';
  }
}

/*
Tables
- FormControl
- FormControlOptions
- FormControlValidators
- FormControlValues

*/
