import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormService } from '../_services/form.service';
import { Form } from '../_models/form';
import { Subscription, take } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css'],
})
export class FormsComponent implements OnInit, OnDestroy {
  forms: Form[] = [];
  formsSubscription: Subscription | undefined;

  constructor(private formService: FormService, private router: Router) {}

  ngOnInit(): void {
    this.formsSubscription = this.formService.getForms().subscribe({
      next: (forms: Form[] | null) => {
        if (forms) {
          this.forms = forms;
        }
      },
    });
  }

  ngOnDestroy(): void {
    this.formsSubscription?.unsubscribe();
  }
}
