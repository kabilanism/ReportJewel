import { Component } from '@angular/core';
import { FadeIn } from '../_helpers/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css', '../_styles/row.styles.css'],
  animations: [FadeIn(200, true)],
})
export class HomeComponent {}
