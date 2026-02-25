export interface ProjectFeedResponse {
  id: string;
  title: string;
  year: number;
  previewImage: string;
  likesCount?: number;
  commentsCount?: number;
  createdAt?: Date[];
  author: {
    id: string;
    name: string;
    profileImage: string | null;
  };
}
