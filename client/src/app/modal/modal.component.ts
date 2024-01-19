import { Component, HostListener, TemplateRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ModalService } from '../_services/modal-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent {
  @ViewChild('modalTemplate', { static: true }) modalTemplate:
    | TemplateRef<void>
    | undefined;
  @ViewChild('createEventForm') createEventForm: NgForm | undefined;
  @HostListener('window:beforeunload', ['$event']) unloadNotification(
    $event: any
  ) {
    if (this.createEventForm?.dirty) {
      $event.returnValue = true;
    }
  }
  modalRef?: BsModalRef;
  showModalSubscription: Subscription | undefined;

  constructor(
    private bsModalService: BsModalService,
    private modalService: ModalService
  ) {
    this.showModalSubscription = this.modalService.loadModal().subscribe({
      next: (_) => {
        if (this.modalTemplate) {
          this.modalRef = this.bsModalService.show(
            this.modalTemplate,
            Object.assign({}, { class: 'gray modal-lg' })
          );
        }
      },
    });
  }

  submitEvent(modalTemplate: TemplateRef<void>) {
    console.log(modalTemplate);
  }
}

// onCalendarItemClicked(modalTemplate: TemplateRef<void>) {
//   this.modalRef = this.modalService.show(
//     modalTemplate,
//     Object.assign({}, { class: 'gray modal-lg' })
//   );
// }
