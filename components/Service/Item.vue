<script setup lang="ts">
import Decimal from "decimal.js";
import markdownit from "markdown-it";
const md = markdownit();

const props = defineProps<{ service: Service }>();

const { currency, changeCurrency } = use$currency();
const rtc = useRuntimeConfig();

const price = computed(() => new Decimal(props.service.price));
const amountList = computed(() => {
  const usdt = price.value;
  const pointer = price.value.mul(new Decimal(rtc.public.usdt_to_pointer));
  const trx = price.value.mul(new Decimal(rtc.public.usdt_to_trx));
  const cny = price.value.mul(new Decimal(rtc.public.usdt_to_cny));
  return { PNT: pointer, TRX: trx, USDT: usdt, CNY: cny };
});

const { $addToCart } = use$cart();
const { $msg } = use$status();
const handleBuy = () => {
  $addToCart(props.service);
  $msg.value = "已添加到购物车";
  return navigateTo("/cart") as void;
};
</script>

<template>
  <li class="bg-white border rounded-md shadow lg:shadow-md flex flex-col">
    <div
      class="bg-gray-100 p-4 flex justify-start items-center gap-x-1 shrink-0"
    >
      <img :src="service.cover" class="w-5 object-cover" v-if="service.cover" />
      <h3 class="text-lg">
        {{ service.name }}
      </h3>
      <NuxtLink
        v-if="service.is_subject && service.target_id"
        class="flex justify-start items-end text-gray-500"
        target="_blank"
        :to="`/goto/subject-${service.target_id}`"
        ><Icon name="uil:external-link-alt" size="0.75rem"
      /></NuxtLink>
    </div>

    <div class="grow flex flex-col">
      <div
        v-html="md.render(service.desc)"
        class="prose max-w-none p-4 grow"
      ></div>

      <div class="flex justify-end items-center gap-x-2 p-4 shrink-0">
        <div @click="changeCurrency">
          <Currency :currency="currency" :amount-list="amountList" />
        </div>
        <div
          class="border border-green-600 bg-green-600 text-white px-2 py-1 rounded text-sm"
        >
          <button
            class="flex items-center justify-center gap-x-1"
            @click="handleBuy"
          >
            <Icon name="heroicons:shopping-cart-solid" size="1.25rem" />
            <div>购买</div>
          </button>
        </div>
      </div>
    </div>
  </li>
</template>
