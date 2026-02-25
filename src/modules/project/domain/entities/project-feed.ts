export interface ProjectFeed {
  id: string;
  title: string;
  previewImage: string;
  year: number;
  likesCount?: number;
  commentsCount?: number;
  createdAt?: Date[];
  author: {
    id: string;
    name: string;
    profileImage: string | null;
  };
}
