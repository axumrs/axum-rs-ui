<script setup lang="ts">
import type Decimal from "decimal.js";

defineProps<{ amount: Decimal }>();
</script>

<template>
  <CurrencyItem
    currency="usdt"
    :amount="amount"
    text-class="text-cyan-600"
    label="USDT"
    border-class="border-cyan-600"
  />
</template>
