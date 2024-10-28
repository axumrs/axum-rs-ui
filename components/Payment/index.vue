<script setup lang="ts">
import type Decimal from "decimal.js";

defineProps<{ kind: PaymentKind; amount: Decimal }>();
</script>

<template>
  <ClientOnly>
    <PaymentOnline v-if="kind === 'Online'" />
    <PaymentQrCode v-else-if="kind === 'QrCode'" />
    <PaymentWechatAlipay :amount="amount" v-else-if="kind === 'WechatAlipay'" />
    <PaymentPointer v-else-if="kind === 'Pointer'" />
  </ClientOnly>
</template>
