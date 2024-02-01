import { Component, OnInit } from '@angular/core';
import { User } from './_models/user';
import { UserService } from './_services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title: string = 'VerifySimply';

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.setCurrentUser();
  }

  setCurrentUser() {
    const userString = localStorage.getItem('user');
    if (!userString) {
      return;
    }

    const user: User = JSON.parse(userString);
    this.userService.setCurrentUser(user);
  }
}
