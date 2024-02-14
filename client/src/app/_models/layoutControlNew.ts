export interface LayoutControlNew {
  layoutId: number;
  name: string;
  description: string;
  placeholder: string | null;
  label: string;
  section: number;
  row: number;
  order: number;
  cellSource: string;
  required: boolean;
}
