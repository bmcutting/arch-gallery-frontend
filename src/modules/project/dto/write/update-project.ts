export interface UpdateProjectDto {
  projectId: string;
  title?: string;
  year?: number;
  description?: string;
  categories?: string[];
  imagesUrl?: string[];
}
