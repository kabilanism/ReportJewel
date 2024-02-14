import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { map } from 'rxjs';
import { UserService } from '../_services/user.service';
import { ToastrService } from 'ngx-toastr';

export const authGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const toastr = inject(ToastrService);

  return userService.currentUser$.pipe(
    map((user) => {
      if (user) {
        return true;
      } else {
        toastr.error('User not authorized.');
        return false;
      }
    })
  );
};
