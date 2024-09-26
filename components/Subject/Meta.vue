<script setup lang="ts">
const { currency, changeCurrency } = use$currency();
const hanldChangeCur = () => {
  changeCurrency();
};
</script>

<template>
  <ul class="flex items-center gap-x-2 text-sm cursor-default">
    <li
      class="border border-green-600 bg-green-600 text-white px-2 py-1 rounded shrink-0"
    >
      已完结
    </li>
    <li
      class="border border-orange-600 bg-orange-600 text-white px-2 py-1 rounded shrink-0"
    >
      连载中
    </li>
    <li
      class="border border-green-600 bg-green-600 text-white px-2 py-1 rounded shrink-0"
    >
      免费
    </li>
    <li @click="hanldChangeCur">
      <Currency
        :currency="currency"
        :amount-list="{ pointer: 99999, trx: 8888, usdt: 123 }"
      />
    </li>

    <li
      class="border border-blue-600 bg-blue-600 text-white px-2 py-1 rounded shrink-0"
    >
      <button class="flex items-center justify-center gap-x-1">
        <Icon name="heroicons:shopping-cart-solid" size="1.25rem" />
        <div>购买</div>
      </button>
    </li>
  </ul>
</template>
