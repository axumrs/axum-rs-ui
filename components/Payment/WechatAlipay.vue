<script setup lang="ts">
import Decimal from "decimal.js";

const props = defineProps<{ amount: Decimal; order: Order }>();
const rtc = useRuntimeConfig();
const cnyAmount = computed(() =>
  props.amount.mul(new Decimal(rtc.public.usdt_to_cny))
);
const { $user } = use$auth();
</script>

<template>
  <div class="space-y-4">
    <ul class="space-y-2 list-decimal list-inside">
      <li>
        现在我们接受<a
          href="/announcement/d0cb73e2h1o5mrframhg"
          class="underline decoration-dotted underline-offset-8 decoration-blue-600"
          target="_blank"
          >微信支付</a
        >
      </li>
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
      <li>
        已支付但未处理？请<a
          class="underline decoration-dotted underline-offset-8 decoration-blue-600"
          :href="`https://sms.axum.eu.org/#/u/${$user?.email}/o/${order.id
            .slice(order.id.length - 6)
            .toUpperCase()}`"
          target="_blank"
          >免费发送短信给站长</a
        >提醒处理。
      </li>
    </ul>

    <div>
      <WePay class="w-64" />
    </div>
  </div>
</template>
