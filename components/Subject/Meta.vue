<script setup lang="ts">
import Decimal from "decimal.js";

const props = defineProps<{ subject: Subject; isPurchased?: boolean }>();
const { currency, changeCurrency } = use$currency();
const { $value: price } = use$decimal(props.subject.price);

const rtc = useRuntimeConfig();

const amountList = computed(() => {
  const usdt = price.value;
  const pointer = price.value.mul(new Decimal(rtc.public.usdt_to_pointer));
  const trx = price.value.mul(new Decimal(rtc.public.usdt_to_trx));
  const cny = price.value.mul(new Decimal(rtc.public.usdt_to_cny));
  return { PNT: pointer, TRX: trx, USDT: usdt, CNY: cny };
});
const hanldChangeCur = () => {
  changeCurrency();
};

const { $get } = use$fetch();
const { $addToCart } = use$cart();
const { $msg, $isLoading } = use$status();
const addToCart = async () => {
  await $get<Service>(`/user/service/subject/${props.subject.id}`, (v) => {
    if (v) {
      $addToCart(v);
      $msg.value = "已添加到购物车";
      $isLoading.value = false;
      return navigateTo("/cart") as void;
    }
  });
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
    <li @click="hanldChangeCur" v-if="!price.isZero() && isPurchased !== true">
      <Currency :currency="currency" :amount-list="amountList" />
    </li>

    <li
      class="border border-blue-600 bg-blue-600 text-white px-2 py-1 rounded shrink-0"
      v-if="!price.isZero() && isPurchased !== true"
    >
      <button
        class="flex items-center justify-center gap-x-1"
        @click="addToCart"
      >
        <Icon name="heroicons:shopping-cart-solid" size="1.25rem" />
        <div>购买</div>
      </button>
    </li>
    <li
      v-if="!price.isZero() && isPurchased === true"
      class="flex justify-start items-center gap-x-1 border border-blue-600 bg-white text-blue-600 px-2 py-1 rounded shrink-0"
    >
      <Icon name="lets-icons:check-fill" size="1.15rem" />
      <div>已购买</div>
    </li>
  </ul>
</template>
