export interface IPagination {
  skip: number;
  take: number;
}

export interface IPaginationQuery {
  pageNumber: number;
  pageSize: number;
}
