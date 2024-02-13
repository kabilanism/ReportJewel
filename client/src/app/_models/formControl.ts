export interface FormControl {
  id: number;
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
  sectionNumber: number;
  rows: FormRow[];
}

export interface FormRow {
  rowNumber: number;
  controls: FormControl[];
}
