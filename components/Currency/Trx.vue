<script setup lang="ts">
defineProps<{ amount: number }>();
</script>

<template>
  <CurrencyItem
    currency="trx"
    :amount="amount"
    text-class="text-gray-600"
    icon="/trx.png"
    label="TRX"
    border-class="border-gray-600"
  />
</template>
