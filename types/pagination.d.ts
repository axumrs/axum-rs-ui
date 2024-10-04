type PaginationMeta = {
  page: number;
  total_page: number;
  page_size: number;
  total: number;
};

type Pagination<T> = PaginationMeta & {
  data: T[] | null;
};
