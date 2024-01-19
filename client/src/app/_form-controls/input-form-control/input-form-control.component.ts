import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-input-form-control',
  templateUrl: './input-form-control.component.html',
  styleUrls: ['./input-form-control.component.css'],
})
export class InputFormControlComponent implements OnInit {
  @Input() inputName: string | undefined;
  @Input() inputType: string | undefined;

  iconClass: string = 'bi-circle';

  constructor() {}

  ngOnInit(): void {
    this.setIconClass();
  }

  private setIconClass(): void {
    if (this.inputType === 'text') {
      this.iconClass = 'bi-file-person';
    } else if (this.inputType === 'email') {
      this.iconClass = 'bi-envelope-at';
    }
  }
}
