<script setup lang="ts">
import Decimal from "decimal.js";

const props = defineProps<{ amount: Decimal; order: Order }>();
const rtc = useRuntimeConfig();
const cnyAmount = computed(() =>
  props.amount.mul(new Decimal(rtc.public.usdt_to_cny))
);
</script>

<template>
  <div class="space-y-4">
    <ul class="space-y-2 list-decimal list-inside">
      <li>现在我们接受微信支付<sup class="text-sky-800 mx-1">测试</sup></li>
      <li>
        汇率是 <code>1:{{ rtc.public.usdt_to_cny }}</code
        >，本订单你需要支付
        <span class="text-red-600 font-bold">{{ cnyAmount }} 元人民币</span>
      </li>
      <li>
        请备注本订单号的后六位，以便进行核验
        <span class="border p-1 font-mono bg-cyan-300 uppercase">{{
          order.id.slice(order.id.length - 6)
        }}</span>
      </li>
    </ul>

    <div>
      <WePay class="w-64" />
    </div>
  </div>
</template>
