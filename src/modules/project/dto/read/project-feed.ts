export interface ProjectFeedResponse {
  id: string;
  title: string;
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
