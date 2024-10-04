<script setup lang="ts">
const { currency } = use$currency();
const { page: pageParam } = useRoute().query;
const page = computed(() => parseInt(pageParam?.toString() || "0", 10) || 0);

const pm = ref<PaginationMeta>();
const subjectList = ref<Subject[]>([]);

const frm = reactive({ page: page.value, page_size: 30 });

const { $get } = use$fetch();

const loadData = async () => {
  await $get<Pagination<Subject>>(
    "/user/subject",
    (v) => {
      if (v) {
        pm.value = v;
        subjectList.value = v.data || [];
      }
    },
    { query: { ...frm } }
  );
};

await loadData();
</script>

<template>
  <section class="flex justify-between items-center">
    <PageTitle title="专题" icon="heroicons:newspaper" />
    <ul class="flex justify-start items-center gap-x-2">
      <li
        class="flex justify-start items-center gap-x-1 border text-xs cursor-pointer rounded px-2 py-1"
        :class="{
          'border-purple-500 text-purple-600 shadow shadow-purple-500/20':
            currency === 'usdt',
        }"
        @click="currency = 'usdt'"
      >
        <div>
          <img src="/usdt.svg" class="w-4 object-cover" />
        </div>
        <div class="">USDT</div>
      </li>
      <li
        class="flex justify-start items-center gap-x-1 border text-xs cursor-pointer rounded px-2 py-1"
        @click="currency = 'trx'"
        :class="{
          'border-purple-500 text-purple-600 shadow shadow-purple-500/20':
            currency === 'trx',
        }"
      >
        <div><img src="/trx.png" class="w-4 object-cover" /></div>
        <div class="">TRX</div>
      </li>
      <li
        class="flex justify-start items-center gap-x-1 border text-xs cursor-pointer rounded px-2 py-1"
        @click="currency = 'pointer'"
        :class="{
          'border-purple-500 text-purple-600 shadow shadow-purple-500/20':
            currency === 'pointer',
        }"
      >
        <div><img src="/pointer.svg" class="w-4 object-cover" /></div>
        <div class="">积分</div>
      </li>
    </ul>
  </section>

  <SubjectList
    class="my-4"
    :list="subjectList"
    v-if="subjectList && subjectList.length > 0"
  />

  <Pagination class="justify-end my-3" v-if="pm && pm.total_page > 1" :p="pm" />
</template>
