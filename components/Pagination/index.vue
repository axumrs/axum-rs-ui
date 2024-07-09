<script setup lang="ts">
const props = defineProps<{ p: PaginationMeta }>();
const p = ref(props.p);
const { hasNextPage } = use$pagination(p.value);

const expanedPageList = ref(false);
</script>

<template>
  <ul class="flex items-center gap-x-2">
    <li>
      <PaginationItem :if-disabled="p.page <= 0" :page="p.page - 1"
        ><Icon name="uil:angle-left" size="1.5rem"
      /></PaginationItem>
    </li>

    <li class="relative w-[4.5rem]">
      <button
        @click="expanedPageList = !expanedPageList"
        class="flex justify-start items-center gap-x-1 border px-1 py-0.5 bg-white w-full divide-x"
      >
        <div class="grow text-center">{{ p.page + 1 }}</div>
        <button
          class="shrink-0 flex flex-col items-center justify-center pl-0.5"
        >
          <Icon
            name="uil:angle-up"
            :class="{ 'rotate-180': expanedPageList }"
          />
        </button>
      </button>
      <ul
        class="absolute w-[3.25rem] z-[1000] bottom-0 max-h-44 bg-white border shadow-md overflow-y-auto py-1 scroll-smooth"
        style="scrollbar-width: thin"
        v-if="expanedPageList"
      >
        <li v-for="i in p.total_page" :key="i">
          <PaginationItem
            :page="i - 1"
            class="odd:border-none even:border-none"
            :if-disabled="i - 1 === p.page"
            >{{ i }}</PaginationItem
          >
        </li>
      </ul>
    </li>

    <li>
      <PaginationItem :if-disabled="!hasNextPage" :page="p.page + 1"
        ><Icon name="uil:angle-right" size="1.5rem"
      /></PaginationItem>
    </li>
  </ul>
</template>
