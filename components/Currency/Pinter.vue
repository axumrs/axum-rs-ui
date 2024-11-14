<script setup lang="ts">
import type Decimal from "decimal.js";

defineProps<{ amount: Decimal }>();
</script>

<template>
  <CurrencyItem
    currency="PNT"
    :amount="amount"
    text-class="text-orange-600"
    label="积分"
    icon="/pointer.svg"
    border-class="border-orange-600"
  />
</template>
