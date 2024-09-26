<script setup lang="ts">
import { CurrencyPinter, CurrencyTrx, CurrencyUsdt } from "#components";
const props = defineProps<{
  currency: Currency;
  amountList: { [key in Currency]: number };
}>();

const com = computed(() => {
  switch (props.currency) {
    case "pointer":
      return CurrencyPinter;
    case "trx":
      return CurrencyTrx;
  }
  return CurrencyUsdt;
});

const amount = computed(() => props.amountList[props.currency] || 0);
</script>

<template>
  <component :is="com" :amount="amount" />
</template>
