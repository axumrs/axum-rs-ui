<script setup lang="ts">
import dayjs from "dayjs";

const { $get } = use$fetch();
const { $user } = use$auth();

const { page: pageParam } = useRoute().query;
const page = computed(() => parseInt(pageParam?.toString() || "0", 10) || 0);
const frm = reactive({ page: page.value, page_size: 30 });

const readHistoies = ref<ReadHistory[]>([]);
const pm = ref<PaginationMeta>();

const loadData = async () => {
  await $get<Pagination<ReadHistory>>(
    "/user/read-history",
    (v) => {
      if (v) {
        readHistoies.value = v.data || [];
        pm.value = { ...v };
      }
    },
    { query: { ...frm } }
  );
};
await loadData();
</script>

<template>
  <PageTitle icon="heroicons:document-text" title="学习记录"></PageTitle>

  <div
    class="my-6 bg-yellow-50 text-orange-600 px-3 py-1.5 border border-orange-200 rounded-md text-sm"
    v-if="$user?.kind === 'Normal'"
  >
    你是普通用户，只能看到最近5条学习记录。如需更多学习记录，请<NuxtLink
      href="/service"
      class="underline decoration-dotted"
      >成为订阅用户</NuxtLink
    >。
  </div>

  <div class="prose max-w-none overflow-x-auto bg-white my-6 p-6 rounded-md">
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>专题</th>
          <th>文章</th>
          <th>时间</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-if="readHistoies && readHistoies.length > 0"
          v-for="h in readHistoies"
          :key="h.id"
        >
          <td>{{ h.id.toUpperCase() }}</td>
          <td>
            <NuxtLink :to="`/subject/${h.subject_slug}`" target="_blank">{{
              h.subject_name
            }}</NuxtLink>
          </td>
          <td>
            <NuxtLink
              :to="`/topic/${h.subject_slug}/${h.slug}`"
              target="_blank"
              >{{ h.topic_title }}</NuxtLink
            >
          </td>
          <td>{{ dayjs(h.dateline).format("YYYY-MM-DD HH:mm:ss") }}</td>
        </tr>
      </tbody>
    </table>
  </div>

  <Pagination class="justify-end my-3" v-if="pm" :p="pm" />
</template>
