import type { CategoryResponse } from "../../../category/dto/read/category";
import type { CommentResponse } from "../../../comment/dto/read/commentResponse";
import type { LikeResponse } from "../../../like/dto/read/like";
import type { UserResponse } from "../../../user/dto/read/user";

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
