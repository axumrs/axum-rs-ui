<script setup lang="ts">
import dayjs from "dayjs";
import Decimal from "decimal.js";

const { id } = useRoute().params;
const { $get } = use$fetch();
const { $status } = use$order();

const order = ref<Order>();
const snap = computed(() => {
  if (order.value) {
    return (JSON.parse(order.value.snapshot) as OrderSnapShot[]) || null;
  }
  return null;
});
const services = computed(() =>
  snap.value ? snap.value.map((s) => s.service) : null
);
const loadData = async () => {
  await $get<Order>(`/user/order/${id}`, (v) => {
    if (v) {
      order.value = v;
    }
  });
};

await loadData();
</script>

<template>
  <PageTitle icon="heroicons:credit-card" title="订单详情" />

  <div v-if="order" class="my-6 bg-white p-6 border rounded-md space-y-4">
    <div class="text-lg font-normal">订单信息</div>
    <ul class="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <li>
        订单号：
        {{ order.id.toUpperCase() }}
      </li>
      <li class="flex justify-start items-center gap-x-2">
        <div>金额：</div>
        <div class="flex justify-start items-center gap-x-1">
          <div
            class="before:content-['原价：'] before:text-gray-500 text-xs text-gray-500 line-through"
            v-if="order.amount !== order.actual_amount"
          >
            {{ new Decimal(order.amount) }}
          </div>
          <div>{{ new Decimal(order.actual_amount) }}</div>
        </div>
        <div><img src="/usdt.svg" class="w-4 object-cover" alt="USDT" /></div>
      </li>
      <li>
        下单时间：
        {{ dayjs(order.dateline).format("YYYY-MM-DD HH:mm:ss") }}
      </li>
      <li class="flex justify-start items-center gap-x-2">
        <div>状态：</div>
        <div class="flex justify-start items-center gap-x-1">
          <div>{{ $status(order.status) }}</div>
        </div>
      </li>
    </ul>
  </div>

  <div class="my-6 bg-white p-6 border rounded-md space-y-4">
    <div class="text-lg font-normal">支付信息</div>
    <Pay :order="order" v-if="order" />
  </div>

  <div
    v-if="services && services.length"
    class="my-6 bg-white p-6 border rounded-md space-y-4"
  >
    <div class="text-lg font-normal">订购的服务</div>
    <div class="prose prose-sm lg:prose-base max-w-none overflow-x-auto">
      <table>
        <thead>
          <tr>
            <th>名称</th>
            <th>单价</th>
            <th>数量</th>
            <th>金额</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="s in services" :key="s.id">
            <td>{{ s.name }}</td>
            <td>{{ new Decimal(s.price) }}</td>
            <td>{{ s.num }}</td>
            <td>
              <div class="flex justify-start items-center gap-x-1">
                <div
                  class="line-through text-gray-500"
                  v-if="s.actual_amount !== s.amount"
                >
                  {{ new Decimal(s.amount) }}
                </div>
                <div>{{ new Decimal(s.actual_amount) }}</div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
