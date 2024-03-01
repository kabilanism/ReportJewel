import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { UserService } from '../_services/user.service';
import { RegisterUser } from '../_models/registerUser';
import { take } from 'rxjs';
import { User } from '../_models/user';
import { formatDate } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FadeIn } from '../_helpers/animations';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css', '../_styles/row.styles.css'],
  animations: [FadeIn(200, true)],
})
export class RegisterComponent implements OnInit {
  registerModalRef?: BsModalRef;
  registerForm: FormGroup;

  constructor(
    private modalService: BsModalService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.userService.currentUser$.pipe(take(1)).subscribe({
      next: (user) => {
        if (user) {
          this.router.navigateByUrl('/home');
        }
      },
    });
  }

  openModal(template: TemplateRef<void>) {
    this.registerModalRef = this.modalService.show(template);
  }

  register() {
    if (this.registerForm.valid) {
      const userToRegister: RegisterUser = this.registerForm.value;
      userToRegister.dateOfBirth = formatDate(
        userToRegister.dateOfBirth,
        'yyyy-MM-dd',
        'en'
      );
      this.userService
        .register(userToRegister)
        .pipe(take(1))
        .subscribe({
          next: (user: User) => {
            this.toastr.success('User successfully registered. Welcome!');
            this.router.navigateByUrl('/home');
            this.registerModalRef?.hide();
          },
        });
    }
  }
}
