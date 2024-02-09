import { Component, OnDestroy, OnInit } from '@angular/core';
import { Form } from '../_models/form';
import { FormService } from '../_services/form.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormControl } from '../_models/formControl';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css', '../_styles/form.styles.css'],
})
export class FormComponent implements OnInit, OnDestroy {
  templateForm: FormGroup;
  form: Form | undefined;
  formSubscription: Subscription = new Subscription();

  constructor(
    private formService: FormService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private formBuilder: FormBuilder
  ) {
    this.templateForm = this.formBuilder.group({
      name: [''],
      description: [''],
    });
  }

  ngOnInit(): void {
    this.formSubscription = this.formService.getForms().subscribe({
      next: (forms: Form[] | null) => {
        if (forms) {
          let formId = Number(this.route.snapshot.paramMap.get('formId'));
          this.form = forms.find((f) => f.id == formId);

          this.templateForm.get('name')?.setValue(this.form?.name);
          this.templateForm
            .get('description')
            ?.setValue(this.form?.description);
        }
      },
    });
  }

  ngOnDestroy(): void {
    this.formSubscription.unsubscribe();
  }

  onControlClicked(id: number): void {
    this.router.navigate(['control', id], { relativeTo: this.route });
  }

  updateForm() {
    let updatedForm = { id: this.form?.id, ...this.templateForm?.value };

    if (this.form) {
      this.formService.updateForm(updatedForm).subscribe({
        next: (_) => {
          this.toastr.success('Template updated successfully.');
        },
      });
    }
  }
}
