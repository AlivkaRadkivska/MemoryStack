import { CategoryT } from "./category";

export interface PhotoT {
  id: string;
  caption: string;
  name: string;
  date: Date;
  category: CategoryT;
}