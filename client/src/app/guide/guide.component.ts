import { Component } from '@angular/core';
import { FadeIn } from '../_helpers/animations';

@Component({
  selector: 'app-guide',
  templateUrl: './guide.component.html',
  styleUrls: ['./guide.component.css'],
  animations: [FadeIn(300, true)],
})
export class GuideComponent {}
