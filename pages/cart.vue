<script setup lang="ts">
import Decimal from "decimal.js";

const {
  $cart,
  $hasItem,
  $emptyCart,
  $count,
  $countAmount,
  $updateItem,
  $delItem,
} = use$cart();

const showClear = ref(false);
const delItem = ref<Cart | null>(null);

const handleClear = () => {
  $emptyCart();
  showClear.value = false;
};

const handleQuantityChange = (c: Cart) => {
  const amount = new Decimal(c.price).mul(new Decimal(c.quantity)).toString();
  const data = { ...c, amount };
  console.log(data);

  $updateItem(data);
};

const handleDel = () => {
  if (delItem.value) {
    $delItem(delItem.value);
    delItem.value = null;
  }
};
</script>

<template>
  <PageTitle icon="heroicons:shopping-cart" title="购物车" />

  <ul class="bg-white my-6 border-y">
    <li class="grid grid-cols-12 gap-x-1 font-normal p-3 border-b">
      <div class="col-span-5">服务</div>
      <div class="col-span-2">单价</div>
      <div class="col-span-2">数量</div>
      <div class="col-span-2">金额</div>
      <div class="col-span-1">
        <!-- 操作 -->
      </div>
    </li>
    <li
      v-if="$hasItem"
      v-for="(c, idx) in $cart"
      class="grid grid-cols-12 gap-x-1 p-3 odd:bg-gray-100/70 lg:hover:bg-gray-100 border-b"
    >
      <div class="col-span-5 flex justify-start items-center gap-x-1">
        <img
          :src="c.cover"
          v-if="c.cover"
          class="w-4 object-cover shrink-0 hidden lg:block"
        />
        <div class="grow">{{ c.name }}</div>
      </div>
      <div class="col-span-2">{{ new Decimal(c.price) }}</div>
      <div class="col-span-2">
        <CartQuantity
          v-model="$cart[idx]"
          class="w-1/2 hidden lg:grid"
          :disabled-update="c.is_subject"
        />
        <span class="lg:hidden">{{ c.quantity }}</span>
      </div>
      <div class="col-span-2">{{ new Decimal(c.amount) }}</div>
      <div class="col-span-1 flex flex-col justify-center items-center">
        <button
          class="flex flex-col justify-center items-center"
          @click="delItem = c"
        >
          <Icon name="uil:times" />
        </button>
      </div>
    </li>
    <li
      v-else
      class="flex flex-col justify-center items-center py-6 text-gray-600 gap-y-2"
    >
      <Icon name="uil:annoyed-alt" size="1.5rem" />
      <div>购物车空空如也</div>
    </li>
    <li
      class="grid grid-cols-12 gap-x-1 p-3 border-t-2 border-b"
      v-if="$hasItem"
    >
      <div class="col-span-2">合计</div>
      <div class="col-span-2 col-start-8">{{ $count }}</div>
      <div class="col-span-2">{{ $countAmount }}</div>
      <div class="col-span-1 flex flex-col justify-center items-center">
        <button class="px-1.5 py-0.5" @click="showClear = true">
          <Icon name="uil:trash" />
        </button>
      </div>
    </li>
    <li class="p-3 flex justify-end pr-4 lg:pr-8 xl:pr-12" v-if="$hasItem">
      <button class="border text-white rounded-md px-2.5 py-1.5 bg-green-600">
        结算
      </button>
    </li>
  </ul>

  <DialogConfirm v-if="showClear" @cancel="showClear = false" @ok="handleClear">
    <div>确定清空购物车吗？</div>
  </DialogConfirm>
  <DialogConfirm v-if="delItem" @cancel="delItem = null" @ok="handleDel">
    <div>
      确定从购物车删除<span
        class="underline underline-offset-4 text-orange-600 decoration-wavy mx-1"
        >{{ delItem.name }}</span
      >吗？
    </div>
  </DialogConfirm>
</template>
