<script setup lang="ts">
import type Decimal from "decimal.js";

const props = defineProps<{
  currency: Currency;
  amount: Decimal;
  textClass: string;
  icon?: string;
  label?: string;
  borderClass: string;
}>();
const icon = computed(
  () => props.icon || `/${props.currency.toLowerCase()}.svg`
);
const label = computed(
  () => props.label || props.currency.toString().toUpperCase()
);
</script>

<template>
  <div
    class="border px-2 py-1 rounded flex justify-start items-center gap-x-1 shrink-0 cursor-pointer relative group"
    :class="{ [borderClass]: true }"
  >
    <div :class="{ [textClass]: true }">
      <img :src="icon" class="w-5 object-cover" :alt="label" />
    </div>
    <div :class="{ [textClass]: true }">{{ amount }}</div>
    <div
      class="absolute z-[1] p-1 rounded-sm shadow min-w-max border bg-white top-9 right-0 before:border-8 before:absolute before:border-transparent before:border-b-gray-200 before:-top-4 before:left-1/2 before:-translate-x-1/2 after:border-8 after:absolute after:border-transparent after:border-b-white after:left-1/2 after:-translate-x-1/2 after:-top-[0.85rem] hidden lg:group-hover:block"
    >
      {{ amount }} {{ label }}
    </div>
  </div>
</template>
