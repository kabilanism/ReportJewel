export interface LayoutControl {
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

export interface LayoutSection {
  sectionNumber: number;
  rows: LayoutRow[];
}

export interface LayoutRow {
  rowNumber: number;
  controls: LayoutControl[];
}
