import type { Category } from "../../../category/domain/entities/category";
import type { Comment } from "../../../comment/domain/entities/comment";
import type { Like } from "../../../like/domain/entities/like";

export interface Project {
  id: string;
  title: string;
  description: string;
  year: number;
  imagesUrl?: string[];
  likes?: Like[];
  comments?: Comment[];
  categories?: Category[];
  createdAt?: Date[];
}
