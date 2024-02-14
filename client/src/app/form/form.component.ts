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
import { FormControl } from '../_models/formControl';
import { Mode } from '../_models/mode';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css', '../_styles/form.styles.css'],
})
export class FormComponent implements OnInit, OnDestroy {
  formConfig: FormGroup;
  form: Form | undefined;
  formSubscription: Subscription;
  addMode: boolean;
  showControlConfig: boolean;
  user: User | undefined;
  mode: Mode | undefined;
  readonly Mode = Mode;

  constructor(
    private formService: FormService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.formConfig = this.formBuilder.group({
      name: [''],
      description: [''],
    });
    this.addMode = false;
    this.showControlConfig = false;
    this.formSubscription = new Subscription();
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.addMode = params['addMode'];

      if (!this.addMode) {
        this.formSubscription = this.getForm();
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
    return this.formService.getForms().subscribe({
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

  addForm() {
    if (this.user) {
      const formToAdd: FormNew = {
        userId: this.user.id,
        name: this.formConfig.get('name')?.value.toString(),
        description: this.formConfig.get('description')?.value.toString(),
      };

      this.formService.addForm(formToAdd).subscribe({
        next: (addedForm: Form) => {
          this.toastr.success('Report layout added successfully.');
        },
      });
    }
  }

  updateForm() {
    if (this.user && this.form) {
      let updatedForm = { id: this.form?.id, ...this.formConfig?.value };
      this.formService.updateForm(updatedForm).subscribe({
        next: (updatedForm: Form) => {
          this.form = updatedForm;
          this.toastr.success('Report layout updated successfully.');
        },
      });
    }
  }

  deleteForm() {
    if (this.user && this.form) {
      this.formService.deleteForm(this.form).subscribe({
        next: (_) => {
          this.toastr.success('Form deleted successfully.');
          this.router.navigateByUrl('/forms');
        },
        error: (error) => {
          this.toastr.error('An error occurred while deleting the form.');
        },
      });
    }
  }

  saveForm() {
    if (this.addMode) {
      this.addForm();
    } else {
      this.updateForm();
    }
  }

  selectControl(control: FormControl) {
    this.formService.setSelectedControl(control);
    this.formService.setControlMode(Mode.Edit);
    this.showControlConfig = true;
  }

  addControl() {
    this.formService.setControlMode(Mode.Add);
    this.showControlConfig = true;
  }

  onControlDeleted() {
    this.showControlConfig = false;
  }
}
