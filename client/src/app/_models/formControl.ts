export interface FormControl {
  id: number;
  type: string;
  name: string;
  description: string;
  placeholder: string | null;
  label: string;
  order: number;
  required: boolean;
}
