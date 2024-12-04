<script setup lang="ts">
import dayjs from "dayjs";
import markdownit from "markdown-it";
const md = markdownit();

const { page: pageParam } = useRoute().query;
const page = computed(() => parseInt(pageParam?.toString() || "0", 10) || 0);

const pm = ref<PaginationMeta>();
const announcementList = ref<Announcement[]>([]);
const selectedAnnouncement = ref<Announcement | null>(null);

const { $get } = use$fetch();
const loadData = async () => {
  await $get<Pagination<Announcement>>(
    "/user/announcement",
    (v) => {
      if (v) {
        pm.value = v;
        announcementList.value = v.data || [];
      }
    },
    { query: { page: page.value } }
  );
};

await loadData();
</script>

<template>
  <PageTitle title="公告" icon="heroicons:bell-alert" />

  <div class="my-6 prose max-w-none lg:prose-lg bg-white rounded-md p-6">
    <table>
      <thead>
        <tr>
          <th>标题</th>
          <th>时间</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-if="announcementList && announcementList.length > 0"
          v-for="a in announcementList"
          :key="a.id"
        >
          <td>
            <button
              @click="selectedAnnouncement = a"
              class="underline underline-offset-2 hover:text-red-600"
            >
              {{ a.title }}
            </button>
          </td>
          <td>{{ dayjs(a.dateline).format("YYYY-MM-DD HH:mm:ss") }}</td>
        </tr>
        <tr v-else>
          <td colspan="2">暂时没有公告</td>
        </tr>
      </tbody>
    </table>
  </div>

  <Pagination class="justify-end my-3" :p="pm" v-if="pm" />

  <Dialog v-if="selectedAnnouncement" @click="selectedAnnouncement = null">
    <div class="text-lg font-normal">
      {{ selectedAnnouncement.title }}
    </div>
    <div
      class="prose max-w-none lg:prose-lg"
      v-html="md.render(selectedAnnouncement.content)"
    ></div>
  </Dialog>
</template>
