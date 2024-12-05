<script setup lang="ts">
const { id: _id } = useRoute().params;
const id = computed(() => _id.toString());

const announcement = ref<Announcement>();

const { $get } = use$fetch();

const loadData = async () => {
  await $get<Announcement>(`/user/announcement/${id.value}`, (v) => {
    if (v) {
      announcement.value = v;
    }
  });
};

await loadData();
</script>

<template>
  <PageTitle title="公告" icon="heroicons:bell-alert" />

  <AnnouncementDetail :announcement="announcement" v-if="announcement" />
</template>
