<script setup lang="ts">
const { cucurrency } = use$cucurrency();
const hanldChangeCur = () => {
  cucurrency.value = cucurrency.value === "trx" ? "usdt" : "usdt";
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
    <li
      @click="hanldChangeCur"
      class="border border-gray-600 px-2 py-1 rounded flex justify-start items-center gap-x-1 shrink-0 cursor-pointer relative group"
      v-if="cucurrency === 'trx'"
    >
      <div><img src="/trx.png" class="w-5 object-cover" alt="trx" /></div>
      <div class="text-gray-600">150</div>
      <div
        class="absolute z-[1] p-1 rounded-sm shadow min-w-max border bg-white top-9 right-0 before:border-8 before:absolute before:border-transparent before:border-b-gray-200 before:-top-4 before:left-1/2 before:-translate-x-1/2 after:border-8 after:absolute after:border-transparent after:border-b-white after:left-1/2 after:-translate-x-1/2 after:-top-[0.85rem] hidden lg:group-hover:block"
      >
        150 TRX
      </div>
    </li>
    <li
      @click="hanldChangeCur"
      class="border border-cyan-600 px-2 py-1 rounded flex justify-start items-center gap-x-1 shrink-0 cursor-pointer relative group"
      v-else
    >
      <div><img src="/usdt.svg" class="w-5 object-cover" alt="usdt" /></div>
      <div class="text-cyan-600">150</div>
      <div
        class="absolute z-[1] p-1 rounded-sm shadow min-w-max border bg-white top-9 right-0 before:border-8 before:absolute before:border-transparent before:border-b-gray-200 before:-top-4 before:left-1/2 before:-translate-x-1/2 after:border-8 after:absolute after:border-transparent after:border-b-white after:left-1/2 after:-translate-x-1/2 after:-top-[0.85rem] hidden lg:group-hover:block"
      >
        150 USDT
      </div>
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
