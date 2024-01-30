import { CategoryT } from './category';

export interface NoteT {
  id: string;
  title: string;
  content: string;
  date: Date;
  category: CategoryT;
}
