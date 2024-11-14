<script setup lang="ts">
import {
  CurrencyPinter,
  CurrencyTrx,
  CurrencyUsdt,
  CurrencyCny,
} from "#components";
import type Decimal from "decimal.js";
const props = defineProps<{
  currency: Currency;
  amountList: { [key in Currency]: Decimal };
}>();

const com = computed(() => {
  switch (props.currency) {
    case "PNT":
      return CurrencyPinter;
    case "TRX":
      return CurrencyTrx;
    case "CNY":
      return CurrencyCny;
  }
  return CurrencyUsdt;
});

const amount = computed(() => props.amountList[props.currency]);
</script>

<template>
  <component :is="com" :amount="amount" />
</template>
