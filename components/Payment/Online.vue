<script setup lang="ts">
import type Decimal from "decimal.js";

const props = defineProps<{
  amount: Decimal;
  order: Order;
  currency: Currency;
}>();

const payStatus = ref<
  "Pending" | "Confirm" | "Update" | "Success" | "Fail" | null
>(null);
const txid = ref<string | null>(null);

const {
  $installedTronLink,
  $usdt,
  $isConnected,
  $walletAddress,
  $connect,
  $trx,
  $confirmTx,
} = use$tronLink();

const { $toast } = use$status();
const handlePay = async () => {
  payStatus.value = "Pending";
  try {
    if (props.currency === "trx") {
      const resp = await $trx(props.amount);
      if (!resp.result) {
        throw new Error("TRX支付失败");
      }
      payStatus.value = "Confirm";
      txid.value = resp.txid;
    } else {
      txid.value = await $usdt(props.amount);
      payStatus.value = "Confirm";
    }

    // POST /user/pay { txid, order_id, currency, amount }
  } catch (e) {
    if (e instanceof Error) {
      $toast.value = e.message;
    } else if (typeof e === "string") {
      if (e === "Confirmation declined by user") {
        $toast.value = "你已取消支付";
      } else {
        $toast.value = e;
      }
    } else {
      $toast.value = `${e}`;
    }
    payStatus.value = "Fail";
  }
};

const confirmTransaction = async (t?: number) => {
  if (txid.value && payStatus.value === "Confirm") {
    const confirmed = await $confirmTx(txid.value);
    if (confirmed) {
      payStatus.value = "Update";
      window.clearInterval(t);

      // PUT /user/pay { txid, order_id, currency, amount }
    } else {
      payStatus.value = "Confirm";
    }
  }
};

watch(
  () => txid.value,
  (nv) => {
    if (nv) {
      payStatus.value = "Confirm";
      const t = window.setInterval(async () => {
        console.log("正在确认交易", nv, payStatus.value);

        await confirmTransaction(t);
      }, 1000);
    }
  }
);
</script>

<template>
  <div class="space-y-4">
    <div>
      <div
        v-if="!$installedTronLink"
        class="bg-yellow-50 text-orange-600 border-orange-600 p-3"
      >
        你需要先安装
        <a
          href="https://www.tronlink.org/cn/dlDetails/"
          target="_blank"
          class="underline decoration-dotted"
          >TronLink钱包</a
        >，才能使用该支付方式。
      </div>

      <div
        v-if="$installedTronLink && !$isConnected"
        class="bg-yellow-50 text-orange-600 border-orange-600 p-3 space-y-2"
      >
        <div>你需要将钱包连接到本站，才能使用该支付方式。</div>
        <button
          class="border rounded-md px-2.5 py-1.5 bg-purple-600 text-white"
          @click="$connect"
        >
          连接TronLink钱包
        </button>
      </div>

      <div
        v-if="$installedTronLink && $isConnected"
        class="space-y-2 bg-green-50 text-teal-600 p-3"
      >
        <div class="overflow-x-auto">
          你已连接 TronLink 钱包，当前钱包地址:
          <code>{{ $walletAddress }}</code>
        </div>
        <div>
          <button
            class="border rounded-md px-2.5 py-1.5 bg-purple-600 text-white flex justify-center items-center gap-x-1"
            @click="handlePay"
          >
            <span>立即支付</span>
            <span
              class="bg-gray-100 text-purple-600 px-1.5 py-0.5 text-sm rounded-md"
              >{{ amount }} {{ currency.toUpperCase() }}</span
            >
          </button>
        </div>
      </div>
    </div>

    <ul class="space-y-2 list-decimal list-inside">
      <li>该支付方式快速到账，并自动确认订单</li>
      <li>
        你需要先安装
        <a
          href="https://www.tronlink.org/cn/dlDetails/"
          target="_blank"
          class="underline decoration-dotted"
          >TronLink钱包</a
        >
      </li>
      <li>点击支付按钮后，会调用 TronLink 钱包的浏览器扩展</li>
    </ul>
  </div>

  <Mask v-if="payStatus">
    <div
      class="bg-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-6 min-w-64 rounded-md shadow-md"
    >
      <div v-if="payStatus === 'Pending'">请在 TronLink 钱包中完成支付</div>
      <div v-else-if="payStatus === 'Success'">支付成功</div>
      <div v-else-if="payStatus === 'Confirm'">
        <div>正在确认交易 {{ txid }}</div>
        <div>区块链确认交易需要一定的时间，请耐心等待</div>
      </div>
      <div v-else-if="payStatus === 'Update'">
        <div>
          正在更新订单状态和购买的服务
          {{ { tx_id: txid, order_id: order.id, currency, amount } }}
        </div>
      </div>
      <div v-else-if="payStatus === 'Fail'" class="space-y-4">
        <div>支付失败</div>
        <div class="flex justify-end items-center">
          <button
            class="border rounded-md px-2.5 py-1.5 bg-blue-500 text-white"
            @click="payStatus = null"
          >
            关闭
          </button>
        </div>
      </div>
    </div>
  </Mask>
</template>
