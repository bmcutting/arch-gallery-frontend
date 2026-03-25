export interface PaginationResult<T> {
  items: T[];
  totalItems: number;
  totalPages: number;
  pageSize: number;
  hasNextPage: boolean;
}
