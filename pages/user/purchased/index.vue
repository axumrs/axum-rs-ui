<script setup lang="ts">
import dayjs from "dayjs";
import Decimal from "decimal.js";

const orderList = ref<Order[]>([]);
const pm = ref<PaginationMeta>();

const { page: pageParam } = useRoute().query;
const page = computed(() => parseInt(pageParam?.toString() || "0", 10) || 0);
const frm = reactive({ page: page.value, page_size: 30, status: "Finished" });

const { $get } = use$fetch();
const { $purchasedServices } = use$order();
const loadData = async () => {
  await $get<Pagination<Order>>(
    "/user/order",
    (v) => {
      if (v) {
        orderList.value = v.data || [];
        pm.value = v;
      }
    },
    { query: { ...frm } }
  );
};

await loadData();
</script>

<template>
  <PageTitle icon="heroicons:server" title="已购服务" />

  <div class="prose max-w-none overflow-x-auto bg-white my-6 p-6 rounded-md">
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>服务</th>
          <th>类型</th>
          <th>金额</th>
          <th>订单号</th>
          <th>时间</th>
        </tr>
      </thead>
      <tbody>
        <template
          v-for="o in orderList"
          v-if="orderList && orderList.length > 0"
          :key="o.id"
        >
          <tr v-for="s in $purchasedServices(o)" :key="s.service.id">
            <td>{{ s.service.id.toUpperCase() }}</td>
            <td>
              <NuxtLink
                :to="`/goto/subject-${s.service.target_id}`"
                target="_blank"
                v-if="s.service.is_subject"
                >{{ s.service.name }}</NuxtLink
              >
              <span v-else>{{ s.service.name }}</span>
            </td>
            <td>
              <div v-if="s.service.is_subject">专题</div>
              <div v-else>
                <span v-if="s.service.duration >= 365">年度订阅</span>
                <span v-else>月度订阅</span>
                <span>({{ s.service.duration }}天)</span>
              </div>
            </td>
            <td>
              <div
                class="flex justify-start items-center gap-x-1 cursor-default"
              >
                <div>{{ new Decimal(s.service.actual_amount) }}</div>
                <div
                  class="leading-none text-[0.65rem] text-gray-500"
                  title="单价 * 数量"
                >
                  <span>{{ new Decimal(s.service.actual_price) }}</span>
                  <span>x</span>
                  <span>{{ new Decimal(s.service.num) }}</span>
                </div>
              </div>
            </td>
            <td>
              <NuxtLink :to="`/user/order/${o.id}`" target="_blank">{{
                o.id.toUpperCase()
              }}</NuxtLink>
            </td>
            <td>{{ dayjs(o.dateline).format("YYYY-MM-DD HH:mm:ss") }}</td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>

  <Pagination class="justify-end my-3" v-if="pm" :p="pm" />
</template>
