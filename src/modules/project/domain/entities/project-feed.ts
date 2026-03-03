import type { Category } from "../../../category/domain/entities/category";

export interface ProjectFeed {
  id: string;
  title: string;
  previewImage: string;
  year: number;
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
