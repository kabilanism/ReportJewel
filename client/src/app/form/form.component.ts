import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Form } from '../_models/form';
import { FormService } from '../_services/form.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription, take } from 'rxjs';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  form: Form | undefined;
  itemId: number = 0;

  constructor(
    private formService: FormService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.formService.forms$.pipe(take(1)).subscribe((forms: Form[]) => {
      let formId = Number(this.route.snapshot.paramMap.get('id'));
      this.form = forms.find((f) => f.id == formId);
    });
  }
}
