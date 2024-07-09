<script setup lang="ts">
const cur = ref<"usdt" | "trx">("usdt");
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
      @click="cur = 'trx'"
      class="border border-gray-600 px-2 py-1 rounded flex justify-start items-center gap-x-1 shrink-0 cursor-pointer"
      v-if="cur === 'trx'"
    >
      <div><img src="/trx.png" class="w-5 object-cover" alt="trx" /></div>
      <div class="text-gray-600">150</div>
    </li>
    <li
      @click="cur = 'usdt'"
      class="border border-cyan-600 px-2 py-1 rounded flex justify-start items-center gap-x-1 shrink-0 cursor-pointer"
      v-else
    >
      <div><img src="/usdt.svg" class="w-5 object-cover" alt="usdt" /></div>
      <div class="text-cyan-600">150</div>
    </li>

    <li
      class="border border-blue-600 bg-blue-600 text-white px-2 py-1 rounded shrink-0"
    >
      <button class="flex flex-col items-center justify-center">
        <Icon name="heroicons:shopping-cart-solid" size="1.25rem" />
      </button>
    </li>
  </ul>
</template>
