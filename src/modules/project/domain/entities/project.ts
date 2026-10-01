import type { Category } from "@modules/category/domain/entities/category";
import type { Comment } from "@modules/comment/domain/entities/comment";
import type { Like } from "@modules/like/domain/entities/like";
import type { User } from "@modules/user/domain/entities/user";

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
