<script setup lang="ts">
import type Decimal from "decimal.js";

defineProps<{
  kind: PaymentKind;
  amount: Decimal;
  order: Order;
  currency: Currency;
  usdtAmount: Decimal;
}>();
</script>

<template>
  <ClientOnly>
    <PaymentOnline
      v-if="kind === 'Online'"
      :order="order"
      :amount="amount"
      :currency="currency"
    />
    <PaymentQrCode v-else-if="kind === 'QrCode'" />
    <PaymentWechatAlipay
      :amount="usdtAmount"
      v-else-if="kind === 'WechatAlipay'"
    />
    <PaymentPointer v-else-if="kind === 'Pointer'" />
  </ClientOnly>
</template>
