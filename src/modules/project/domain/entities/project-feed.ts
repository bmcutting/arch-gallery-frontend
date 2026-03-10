import type { Category } from "../../../category/domain/entities/category";
import type { Comment } from "../../../comment/domain/entities/comment";
import type { Like } from "../../../like/domain/entities/like";

export interface ProjectFeed {
  id: string;
  title: string;
  previewImage: string;
  year: number;
  likes?: Like[];
  comments?: Comment[];
  createdAt?: Date;
  categories: Category[];
  likedByUser: boolean;
  author: {
    id: string;
    name: string;
    profileImage: string | null;
  };
}
