<script setup lang="ts">
import Decimal from "decimal.js";

const { currency } = use$currency();
const { page: pageParam } = useRoute().query;
const page = computed(() => parseInt(pageParam?.toString() || "0", 10) || 0);

const pm = ref<PaginationMeta>();
const subjectList = ref<Subject[]>([]);
const purchasedSubjects = ref<{ [key: string]: boolean }>();

const frm = reactive({ page: page.value, page_size: 30 });

const { $get } = use$fetch();

const loadData = async () => {
  await $get<Pagination<Subject>>(
    "/user/subject",
    (v) => {
      if (v) {
        pm.value = v;
        subjectList.value = v.data || [];

        loadPurchasedServices().then();
      }
    },
    { query: { ...frm } }
  );
};

const loadPurchasedServices = async () => {
  const ids = subjectList.value
    .filter((s) => new Decimal(s.price).gt(new Decimal(0)))
    .map((s) => s.id)
    .join(",");
  await $get<{ [key: string]: boolean }>(
    "/user/subject/purchased",
    (v) => {
      if (v) {
        purchasedSubjects.value = v;
      }
    },
    {
      query: { ids },
    }
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
            currency === 'USDT',
        }"
        @click="currency = 'USDT'"
      >
        <div>
          <img src="/usdt.svg" class="w-4 object-cover" />
        </div>
        <div class="">USDT</div>
      </li>
      <li
        class="flex justify-start items-center gap-x-1 border text-xs cursor-pointer rounded px-2 py-1"
        @click="currency = 'TRX'"
        :class="{
          'border-purple-500 text-purple-600 shadow shadow-purple-500/20':
            currency === 'TRX',
        }"
      >
        <div><img src="/trx.png" class="w-4 object-cover" /></div>
        <div class="">TRX</div>
      </li>
      <li
        class="flex justify-start items-center gap-x-1 border text-xs cursor-pointer rounded px-2 py-1"
        @click="currency = 'PNT'"
        :class="{
          'border-purple-500 text-purple-600 shadow shadow-purple-500/20':
            currency === 'PNT',
        }"
      >
        <div><img src="/pointer.svg" class="w-4 object-cover" /></div>
        <div class="">积分</div>
      </li>
      <li
        class="flex justify-start items-center gap-x-1 border text-xs cursor-pointer rounded px-2 py-1"
        @click="currency = 'CNY'"
        :class="{
          'border-purple-500 text-purple-600 shadow shadow-purple-500/20':
            currency === 'CNY',
        }"
      >
        <div><img src="/cny.svg" class="w-4 object-cover" /></div>
        <div class="">人民币</div>
      </li>
    </ul>
  </section>

  <SubjectList
    class="my-4"
    :list="subjectList"
    :purchased-subjects="purchasedSubjects"
    v-if="subjectList && subjectList.length > 0"
  />

  <Pagination class="justify-end my-3" v-if="pm && pm.total_page > 1" :p="pm" />
</template>
