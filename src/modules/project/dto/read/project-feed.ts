import type { Category } from "../../../category/domain/entities/category";

export interface ProjectFeedResponse {
  id: string;
  title: string;
  year: number;
  previewImage: string;
  likesCount?: number;
  commentsCount?: number;
  createdAt?: Date;
  categories: Category[];
  author: {
    id: string;
    name: string;
    profileImage: string | null;
  };
}
