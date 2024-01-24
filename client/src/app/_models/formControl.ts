export interface FormControl {
  id: string;
  type: string;
  formControlName: string;
  placeholder: string | null;
  label: string;
  order: number;
  required: boolean;
  value: string | null;
  options: SelectOption[] | null;
  iconClass: string;
}

export interface SelectOption {
  value: string;
  displayValue: string;
}
