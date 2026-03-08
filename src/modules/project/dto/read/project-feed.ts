import type { Category } from "../../../category/domain/entities/category";
import type { CommentResponse } from "../../../comment/dto/read/commentResponse";
import type { LikeResponse } from "../../../like/dto/read/like";

export interface ProjectFeedResponse {
  id: string;
  title: string;
  year: number;
  previewImage: string;
  likes: LikeResponse[];
  comments: CommentResponse[];
  createdAt?: Date;
  categories: Category[];
  author: {
    id: string;
    name: string;
    profileImage: string | null;
  };
}
