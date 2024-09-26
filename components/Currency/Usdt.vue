<script setup lang="ts">
defineProps<{ amount: number }>();
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
