import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-textarea-form-control',
  templateUrl: './textarea-form-control.component.html',
  styleUrls: ['./textarea-form-control.component.css'],
})
export class TextareaFormControlComponent {
  @Input() description: string | undefined;
}
