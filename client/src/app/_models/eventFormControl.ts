export interface EventFormControl {
  id: string;
  type: string;
  formControlName: string;
  placeholder: string | null;
  label: string;
  order: number;
  required: boolean;
  value: string | null;
  options: string[] | null;
  iconClass: string;
}
