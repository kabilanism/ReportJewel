import { FormControl } from './formControl';

export interface Form {
  id: number;
  name: string;
  description: string;
  controls: FormControl[];
}
