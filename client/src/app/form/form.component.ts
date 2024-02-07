import { Component, OnInit } from '@angular/core';
import { Form } from '../_models/form';
import { FormService } from '../_services/form.service';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';
import { FormControl } from '../_models/formControl';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css', '../_styles/form.styles.css'],
})
export class FormComponent implements OnInit {
  form: Form | undefined;
  itemId: number = 0;

  constructor(
    private formService: FormService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.formService.forms$.pipe(take(1)).subscribe((forms: Form[] | null) => {
      if (forms) {
        let formId = Number(this.route.snapshot.paramMap.get('id'));
        this.form = forms.find((f) => f.id == formId);
      }
    });
  }

  onControlClicked(id: number): void {
    let control: FormControl | undefined = this.form?.controls.find(
      (c) => c.id == id
    );
    if (control) {
      this.formService.controlSelected(control);
      this.router.navigateByUrl('/control');
    }
  }
}
