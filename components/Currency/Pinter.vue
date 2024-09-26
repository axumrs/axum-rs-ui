<script setup lang="ts">
defineProps<{ amount: number }>();
</script>

<template>
  <CurrencyItem
    currency="pointer"
    :amount="amount"
    text-class="text-orange-600"
    label="积分"
    border-class="border-orange-600"
  />
</template>
