import { LayoutControl } from './layoutControl';

export interface Layout {
  id: number;
  name: string;
  description: string;
  controls: LayoutControl[];
}
