export interface FormControl {
  id: number;
  type: string;
  name: string;
  description: string;
  placeholder: string | null;
  label: string;
  section: number;
  row: number;
  order: number;
  cellSource: string;
  required: boolean;
  value: string | number | Date | boolean | undefined;
}

export interface FormSection {
  rows: FormRow[];
}

export interface FormRow {
  controls: FormControl[];
}
