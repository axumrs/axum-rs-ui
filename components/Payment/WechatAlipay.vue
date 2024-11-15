<script setup lang="ts">
import Decimal from "decimal.js";

const props = defineProps<{ amount: Decimal }>();
const rtc = useRuntimeConfig();
const cnyAmount = computed(() =>
  props.amount.mul(new Decimal(rtc.public.usdt_to_cny))
);
</script>

<template>
  <div class="space-y-4">
    <ul class="space-y-2 list-decimal list-inside">
      <li>原则上我们不接受微信/支付宝进行支付</li>
      <li>
        如果你确实需要通过微信/支付宝进行支付，请点击下方链接通过TG和站长私聊，获取微信/支付宝收款码
      </li>
      <li>
        汇率是 <code>1:{{ rtc.public.usdt_to_cny }}</code
        >，本订单你需要支付
        <span class="text-red-600 font-bold">{{ cnyAmount }} 元人民币</span>
      </li>
    </ul>

    <div>
      <a
        class="border rounded-md px-2.5 py-1.5 bg-blue-500/80 text-white inline-flex items-center gap-x-1"
        :href="rtc.public.contactTg"
      >
        <Icon name="ic:baseline-telegram" size="1.25rem" />
        与站长私聊
      </a>
    </div>
  </div>
</template>
