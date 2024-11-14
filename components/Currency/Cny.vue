<script setup lang="ts">
import type Decimal from "decimal.js";

defineProps<{ amount: Decimal }>();
</script>

<template>
  <CurrencyItem
    currency="CNY"
    :amount="amount"
    text-class="text-lime-600"
    label="人民币"
    border-class="border-lime-600"
  />
</template>
