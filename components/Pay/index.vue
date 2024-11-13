<script setup lang="ts">
import Decimal from "decimal.js";

const props = defineProps<{ order: Order }>();

const tabList: { label: string; value: PaymentKind; disabled?: boolean }[] = [
  { label: "在线支付", value: "Online" },
  { label: "扫码支付", value: "QrCode" },
  { label: "微信支付", value: "WechatAlipay" },
  { label: "积分支付", value: "Pointer" },
];
const curentTab = ref<PaymentKind>(tabList[0].value);
const { currency, changeCurrency } = use$currency();

const usdtAmount = computed(() => new Decimal(props.order.actual_amount || 0));

const rtc = useRuntimeConfig();
const amountList = computed(() => {
  const usdt = usdtAmount.value;
  const pointer = usdtAmount.value.mul(new Decimal(rtc.public.usdt_to_pointer));
  const trx = usdtAmount.value.mul(new Decimal(rtc.public.usdt_to_trx));
  const cny = usdtAmount.value.mul(new Decimal(rtc.public.usdt_to_cny));
  return { PNT: pointer, TRX: trx, USDT: usdt, CNY: cny };
});

const currentCurrency = computed<Currency>(() => {
  if (currency.value === "TRX") {
    return "TRX";
  }
  return "USDT";
});
const currentAmount = computed(() => {
  if (currency.value === "TRX") {
    return amountList.value.TRX;
  }
  return amountList.value.USDT;
});

const { $get } = use$fetch();

const pay = ref<Pay | null>(null);
const is_re_pay = ref(false);
const loadPay = async () => {
  await $get<Pay>(`/user/pay/order/${props.order.id}`, (v) => {
    if (v) {
      pay.value = v;
    }
  });
};

const rePay = () => {
  pay.value = null;
  is_re_pay.value = true;
};

onMounted(() => {
  loadPay().then();
});
</script>

<template>
  <PayDetail v-if="pay" :pay="pay" @re-pay="rePay" />
  <section v-else>
    <div v-if="order" class="my-6 bg-white p-6 border rounded-md space-y-4">
      <div class="flex justify-start items-center gap-x-2 relative">
        <div>支付金额：</div>
        <div class="flex justify-start items-center gap-x-1">
          <div
            class="before:content-['原价：'] before:text-gray-500 text-xs text-gray-500 line-through"
            v-if="order.amount !== order.actual_amount"
          >
            {{ new Decimal(order.amount) }}
          </div>
          <div @click="changeCurrency">
            <Currency :currency="currency" :amount-list="amountList" />
          </div>
        </div>
        <div
          class="absolute bg-white border rounded-sm p-0.5 border-red-800 -top-7 animate-bounce text-red-800 left-20 min-w-max text-xs leading-none after:absolute after:bg-green-800 after:border-[4.5px] after:border-white after:border-t-red-800 after:-bottom-2 after:left-1/2 after:-translate-x-1/2"
        >
          点击切换货币
        </div>
      </div>
    </div>

    <div class="my-6 bg-white p-6 border rounded-md space-y-4">
      <div class="text-lg font-normal">付款</div>
      <ul class="flex justify-start items-center overflow-hidden gap-x-2">
        <li
          v-for="t in tabList"
          :key="t.value"
          @click="
            () => {
              curentTab = t.value;
            }
          "
          :class="{
            'bg-white font-normal': curentTab === t.value,
            'bg-gray-100': curentTab !== t.value,
            'cursor-not-allowed': t.disabled,
          }"
          class="px-2.5 py-1 rounded cursor-pointer lg:hover:font-normal border"
        >
          {{ t.label }}
        </li>
      </ul>
      <section class="bg-white">
        <Payment
          :kind="curentTab"
          :amount="currentAmount"
          :currency="currentCurrency"
          :order="order"
          :usdt-amount="usdtAmount"
          :re_pay="is_re_pay"
          v-if="order"
        />
      </section>
    </div>
  </section>
</template>
