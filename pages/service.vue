<script setup lang="ts">
const { $get } = use$fetch();

const pm = ref<PaginationMeta>();
const serviceList = ref<Service[]>([]);

const { page: pageParam } = useRoute().query;
const page = computed(() => parseInt(pageParam?.toString() || "0", 10) || 0);

const loadData = async () => {
  await $get<Pagination<Service>>(
    "/user/service",
    (v) => {
      if (v) {
        pm.value = v;
        serviceList.value = v.data || [];
      }
    },
    { query: { page: page.value } }
  );
};

await loadData();
</script>

<template>
  <PageTitle icon="heroicons:building-storefront" title="服务" />

  <ul class="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8 w-full my-6">
    <ServiceItem :key="s.id" :service="s" v-for="s in serviceList" />
  </ul>

  <Pagination class="justify-end my-3" v-if="pm && pm.total_page" :p="pm" />
</template>
