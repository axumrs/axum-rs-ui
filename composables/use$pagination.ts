export default function use$pagination(p: PaginationMeta) {
  const firstPage = 0;
  const prevPage = computed(() =>
    p.page > firstPage ? p.page - 1 : firstPage
  );
  const hasPrevPage = computed(() => prevPage.value >= firstPage);

  const lastPage = computed(() => p.total_page - 1);
  const nextPage = computed(() =>
    p.page < lastPage.value ? p.page : lastPage.value
  );
  const hasNextPage = computed(() => nextPage.value < lastPage.value);

  return { prevPage, hasPrevPage, lastPage, nextPage, hasNextPage };
}
