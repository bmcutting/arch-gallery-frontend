import type { Category } from "../../../category/domain/entities/category";
import type { UserResponse } from "../../../user/dto/read/user";

export interface ProjectResponse {
  id: string;
  title: string;
  description: string;
  year: number;
  createdAt: string;
  imagesUrl: string[];
  categories: Category[];
  user: UserResponse;
  likesCount: number;
  commentsCount: number;
}
