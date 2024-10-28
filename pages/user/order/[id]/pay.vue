<script setup lang="ts">
import Decimal from "decimal.js";

const tabList: { label: string; value: PaymentKind; disabled?: boolean }[] = [
  { label: "在线支付", value: "Online" },
  { label: "扫码支付", value: "QrCode" },
  { label: "微信/支付宝", value: "WechatAlipay" },
  { label: "积分支付", value: "Pointer" },
];
const curentTab = ref<PaymentKind>(tabList[0].value);
const { currency, changeCurrency } = use$currency();

const { id } = useRoute().params;
const { $get } = use$fetch();

const order = ref<Order>();

const usdtAmount = computed(() => new Decimal(order.value?.actual_amount || 0));

const rtc = useRuntimeConfig();
const amountList = computed(() => {
  const usdt = usdtAmount.value;
  const pointer = usdtAmount.value.mul(new Decimal(rtc.public.usdt_to_pointer));
  const trx = usdtAmount.value.mul(new Decimal(rtc.public.usdt_to_trx));
  return { pointer, trx, usdt };
});
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
  <PageTitle icon="heroicons:credit-card" title="付款" />

  <div v-if="order" class="my-6 bg-white p-6 border rounded-md space-y-4">
    <!-- <div class="text-lg font-normal">订单摘要</div> -->
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
          <div @click="changeCurrency">
            <Currency :currency="currency" :amount-list="amountList" />
          </div>
        </div>
      </li>
    </ul>
  </div>

  <div class="my-6 bg-white p-6 border rounded-md space-y-4">
    <div class="text-lg font-normal">付款</div>
    <ul class="flex justify-start items-center overflow-hidden gap-x-2">
      <li
        v-for="t in tabList"
        :key="t.value"
        @click="
          () => {
            curentTab = t.value;
          }
        "
        :class="{
          'bg-white font-normal': curentTab === t.value,
          'bg-gray-100': curentTab !== t.value,
          'cursor-not-allowed': t.disabled,
        }"
        class="px-2.5 py-1 rounded cursor-pointer lg:hover:font-normal border"
      >
        {{ t.label }}
      </li>
    </ul>
    <section class="bg-white">
      <Payment :kind="curentTab" :amount="usdtAmount" />
    </section>
  </div>
</template>
