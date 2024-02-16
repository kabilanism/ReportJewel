import { Component } from '@angular/core';
import { UserService } from '../_services/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LayoutService } from '../_services/layout.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent {
  model: any = {};

  constructor(
    public userService: UserService,
    private router: Router,
    private toastr: ToastrService,
    private layoutService: LayoutService
  ) {}

  login(): void {
    this.userService.login(this.model).subscribe({
      next: () => {
        this.router.navigateByUrl('/home');
        this.model = {};
      },
      error: (error) => {
        this.toastr.error(error.error);
      },
    });
  }

  logout() {
    this.layoutService.resetLayouts();
    this.userService.logout();
    this.router.navigateByUrl('/');
  }
}
