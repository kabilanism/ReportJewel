export interface FormControl {
  id: number;
  type: string;
  name: string;
  placeholder: string | null;
  label: string;
  order: number;
  required: boolean;
}
