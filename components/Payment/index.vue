<script setup lang="ts">
import type Decimal from "decimal.js";

defineProps<{
  kind: PaymentKind;
  amount: Decimal;
  order: Order;
  currency: Currency;
  usdtAmount: Decimal;
  re_pay: boolean;
}>();
const emits = defineEmits(["payDone"]);
</script>

<template>
  <ClientOnly>
    <PaymentOnline
      v-if="kind === 'Online'"
      :order="order"
      :amount="amount"
      :currency="currency"
      :re_pay="re_pay"
      @pay-done="emits('payDone')"
    />
    <PaymentQrCode v-else-if="kind === 'QrCode'" />
    <PaymentWechatAlipay
      :amount="usdtAmount"
      :order="order"
      v-else-if="kind === 'WechatAlipay'"
    />
    <PaymentPointer v-else-if="kind === 'Pointer'" />
  </ClientOnly>
</template>
