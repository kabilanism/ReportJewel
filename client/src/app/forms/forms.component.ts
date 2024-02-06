import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormService } from '../_services/form.service';
import { Form } from '../_models/form';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css'],
})
export class FormsComponent implements OnInit, OnDestroy {
  forms: Form[] = [];
  formsSubscription: Subscription | undefined;

  constructor(private formService: FormService) {}

  ngOnInit(): void {
    this.formsSubscription = this.formService.forms$.subscribe({
      next: (forms: Form[]) => {
        this.forms = forms;
      },
    });

    this.formService.getForms();
  }

  ngOnDestroy(): void {
    this.formsSubscription?.unsubscribe();
  }
}
