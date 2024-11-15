<script setup lang="ts">
import dayjs from "dayjs";
import Decimal from "decimal.js";

const { $get, $put } = use$fetch();
const { $status } = use$order();
const { $msg } = use$status();

const orderList = ref<Order[]>([]);
const pm = ref<PaginationMeta>();
const cancelOrder = ref<Order | null>(null);

const loadData = async () => {
  await $get<Pagination<Order>>("/user/order", (v) => {
    if (v) {
      orderList.value = v.data || [];
      pm.value = v;
    }
  });
};

const handleCancelOrder = async () => {
  if (cancelOrder.value) {
    await $put(`/user/order/${cancelOrder.value.id}`, {}, () => {
      $msg.value = "订单取消成功";
      cancelOrder.value = null;
      loadData().then();
    });
  }
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
                @click="cancelOrder = { ...o }"
              >
                取消
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <DialogConfirm
    v-if="cancelOrder"
    @cancel="cancelOrder = null"
    @ok="handleCancelOrder"
  >
    <template #header>
      <h3>取消订单</h3>
    </template>
    <template #default>
      <div>
        确定要取消订单<span
          class="text-orange-600 underline underline-offset-4 decoration-wavy mx-1"
          >{{ cancelOrder.id.toUpperCase() }}</span
        >吗?
      </div>
    </template>
  </DialogConfirm>
</template>
