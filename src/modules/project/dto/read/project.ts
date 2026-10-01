import type { CategoryResponse } from "@modules/category/dto/read/category";
import type { CommentResponse } from "@modules/comment/dto/read/commentResponse";
import type { LikeResponse } from "@modules/like/dto/read/like";
import type { UserResponse } from "@modules/user/dto/read/user";

export interface ProjectResponse {
  id: string;
  title: string;
  description: string;
  year: number;
  createdAt: Date;
  imagesUrl: string[];
  categories: CategoryResponse[];
  user: UserResponse;
  likes: LikeResponse[];
  comments: CommentResponse[];
}
