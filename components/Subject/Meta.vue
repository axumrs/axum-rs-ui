<script setup lang="ts">
import Decimal from "decimal.js";

const props = defineProps<{ subject: Subject }>();
const { currency, changeCurrency } = use$currency();
const { $value: price } = use$decimal(props.subject.price);

const rtc = useRuntimeConfig();

const amountList = computed(() => {
  const usdt = price.value;
  const pointer = price.value.mul(new Decimal(rtc.public.usdt_to_pointer));
  const trx = price.value.mul(new Decimal(rtc.public.usdt_to_trx));
  return { pointer, trx, usdt };
});
const hanldChangeCur = () => {
  changeCurrency();
};
</script>

<template>
  <ul class="flex items-center gap-x-2 text-sm cursor-default">
    <li
      class="border border-green-600 bg-green-600 text-white px-2 py-1 rounded shrink-0"
      v-if="subject.status === 'Finished'"
    >
      已完结
    </li>
    <li
      class="border border-orange-600 bg-orange-600 text-white px-2 py-1 rounded shrink-0"
      v-else
    >
      连载中
    </li>
    <li
      class="border border-green-600 bg-green-600 text-white px-2 py-1 rounded shrink-0"
      v-if="price.isZero()"
    >
      免费
    </li>
    <li @click="hanldChangeCur" v-else>
      <Currency :currency="currency" :amount-list="amountList" />
    </li>

    <li
      class="border border-blue-600 bg-blue-600 text-white px-2 py-1 rounded shrink-0"
      v-if="!price.isZero()"
    >
      <button class="flex items-center justify-center gap-x-1">
        <Icon name="heroicons:shopping-cart-solid" size="1.25rem" />
        <div>购买</div>
      </button>
    </li>
  </ul>
</template>
