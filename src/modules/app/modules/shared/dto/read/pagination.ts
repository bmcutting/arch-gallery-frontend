export interface PaginationResponse<T> {
  items: T[];
  totalItems: number;
  totalPages: number;
  limit: number;
  hasNextPage: boolean;
}
