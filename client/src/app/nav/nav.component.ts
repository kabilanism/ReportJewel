import { Component } from '@angular/core';
import { UserService } from '../_services/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LayoutService } from '../_services/layout.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent {
  loginForm: FormGroup;

  constructor(
    public userService: UserService,
    private router: Router,
    private toastr: ToastrService,
    private layoutService: LayoutService,
    private formBuilder: FormBuilder
  ) {
    this.loginForm = formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login(): void {
    this.userService.login(this.loginForm.value).subscribe({
      next: () => {
        this.router.navigateByUrl('/home');
        this.loginForm.reset();
      },
      error: (error) => {
        this.toastr.error(error.error);
      },
    });
  }

  logout() {
    this.userService.logout();
    this.router.navigateByUrl('/');
  }
}
