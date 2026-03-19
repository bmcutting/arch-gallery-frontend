export interface CreateProjectDto {
  title: string;
  year: number;
  description?: string;
  categories?: string[];
  userId: string;
}
