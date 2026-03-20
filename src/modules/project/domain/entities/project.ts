import type { Category } from "../../../category/domain/entities/category";
import type { Comment } from "../../../comment/domain/entities/comment";
import type { Like } from "../../../like/domain/entities/like";
import type { User } from "../../../user/domain/entities/user";

export interface Project {
  id: string;
  title: string;
  description: string;
  year: number;
  user: User;
  imagesUrl?: string[];
  likes?: Like[];
  comments?: Comment[];
  categories?: Category[];
  createdAt: Date;
}
