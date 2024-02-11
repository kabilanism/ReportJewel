import { Component, OnDestroy, OnInit } from '@angular/core';
import { Form } from '../_models/form';
import { FormService } from '../_services/form.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, take } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../_services/user.service';
import { User } from '../_models/user';
import { FormNew } from '../_models/formNew';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css', '../_styles/form.styles.css'],
})
export class FormComponent implements OnInit, OnDestroy {
  formConfig: FormGroup;
  form: Form | undefined;
  formSubscription: Subscription = new Subscription();
  addMode: boolean = false;
  controlClicked: boolean = false;
  user: User | undefined;

  constructor(
    private formService: FormService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {
    this.formConfig = this.formBuilder.group({
      name: [''],
      description: [''],
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.addMode = params['addMode'];

      if (!this.addMode) {
        this.getForm();
      }
    });

    this.userService.currentUser$.pipe(take(1)).subscribe({
      next: (user) => {
        if (user) {
          this.user = user;
        }
      },
    });
  }

  getForm() {
    this.formSubscription = this.formService.getForms().subscribe({
      next: (forms: Form[] | null) => {
        if (forms) {
          let formId = Number(this.route.snapshot.paramMap.get('formId'));
          this.form = forms.find((f) => f.id == formId);

          this.formConfig.get('name')?.setValue(this.form?.name);
          this.formConfig.get('description')?.setValue(this.form?.description);
        }
      },
    });
  }

  ngOnDestroy(): void {
    this.formSubscription.unsubscribe();
  }

  onControlClicked(id: number): void {
    this.controlClicked = true;
    this.formService.controlSelected(id);
  }

  addForm() {
    if (this.user) {
      const formToAdd: FormNew = {
        userId: this.user.id,
        name: this.formConfig.get('name')?.value.toString(),
        description: this.formConfig.get('description')?.value.toString(),
      };

      this.formService.addForm(formToAdd).subscribe({
        next: (addedForm: Form) => {
          console.log(addedForm);
          this.toastr.success('Report layout added successfully.');
        },
      });
    }
  }

  updateForm() {
    if (this.user) {
      let updatedForm = { id: this.form?.id, ...this.formConfig?.value };
      if (this.form) {
        this.formService.updateForm(updatedForm).subscribe({
          next: (updatedForm: Form) => {
            this.form = updatedForm;
            this.toastr.success('Report layout updated successfully.');
          },
        });
      }
    }
  }

  saveForm() {
    if (this.addMode) {
      this.addForm();
    } else {
      this.updateForm();
    }
  }
}
