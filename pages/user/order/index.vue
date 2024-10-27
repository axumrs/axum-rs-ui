<script setup lang="ts">
import dayjs from "dayjs";
import Decimal from "decimal.js";

const { $get } = use$fetch();
const { $status } = use$order();

const orderList = ref<Order[]>([]);
const pm = ref<PaginationMeta>();

const loadData = async () => {
  await $get<Pagination<Order>>("/user/order", (v) => {
    if (v) {
      orderList.value = v.data || [];
      pm.value = v;
    }
  });
};
await loadData();
</script>

<template>
  <PageTitle icon="heroicons:credit-card" title="订单" />

  <div class="prose max-w-none overflow-x-auto bg-white my-6 p-6 rounded-md">
    <table>
      <thead>
        <tr>
          <th>订单号</th>
          <th>金额</th>
          <th>状态</th>
          <th>下单时间</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="o in orderList"
          v-if="orderList && orderList.length"
          :key="o.id"
        >
          <td>{{ o.id.toUpperCase() }}</td>
          <td>
            <div class="flex justify-start items-center gap-x-1">
              <div class="flex justify-start items-center gap-x-1">
                <div
                  class="before:text-gray-500 text-xs text-gray-500 line-through"
                  v-if="o.amount !== o.actual_amount"
                >
                  {{ new Decimal(o.amount) }}
                </div>
                <div>{{ new Decimal(o.actual_amount) }}</div>
              </div>
            </div>
          </td>
          <td>{{ $status(o.status) }}</td>
          <td>{{ dayjs(o.dateline).format("YYYY-MM-DD HH:mm:ss") }}</td>
          <td>
            <div class="flex justify-start items-center gap-x-1">
              <NuxtLink
                :to="`/user/order/${o.id}`"
                class="border bg-blue-600 text-white px-1.5 py-0.5 text-sm rounded hover:bg-blue-700 no-underline"
              >
                详情
              </NuxtLink>
              <button
                v-if="o.status === 'Pending'"
                class="border bg-orange-600 text-white px-1.5 py-0.5 text-sm rounded hover:bg-orange-700"
              >
                取消
              </button>
              <NuxtLink
                :to="`/user/order/${o.id}/pay`"
                v-if="o.status === 'Pending'"
                class="border bg-green-600 text-white px-1.5 py-0.5 text-sm rounded hover:bg-green-700 no-underline"
              >
                付款
              </NuxtLink>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
