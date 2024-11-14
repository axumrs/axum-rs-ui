<script setup lang="ts">
import type Decimal from "decimal.js";

const props = defineProps<{
  amount: Decimal;
  order: Order;
  currency: Currency;
  re_pay: boolean;
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

const { $toast, $isLoading } = use$status();

const { $post, $put } = use$fetch();

const pay_id = ref<string>();
const handlePay = async () => {
  payStatus.value = "Pending";
  try {
    if (props.currency === "TRX") {
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

    await $post<IDResp>(
      "/user/pay",
      {
        order_id: props.order.id,
        currency: props.currency,
        method: "Online",
        tx_id: txid.value,
        amount: props.amount,
        re_pay: props.re_pay,
      },
      (v) => {
        if (v) {
          pay_id.value = v.id;
        }
      },
      {
        ifErr(e) {
          $isLoading.value = false;
          throw e;
        },
      }
    );
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

      await $put(
        "/user/pay",
        {
          order_id: props.order.id,
          currency: props.currency,
          pay_id: pay_id.value,
          tx_id: txid.value,
        },
        () => {
          payStatus.value = "Success";
        },
        {
          ifErr(e) {
            $isLoading.value = false;
            payStatus.value = "Fail";
            $toast.value = e.message;
          },
        }
      );
    } else {
      payStatus.value = "Confirm";
    }
  }
};

const emits = defineEmits(["payDone"]);

watch(
  () => txid.value,
  (nv) => {
    if (nv) {
      payStatus.value = "Confirm";
      const t = window.setInterval(async () => {
        await confirmTransaction(t);
      }, 5000);
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
      <div v-if="payStatus === 'Pending'" class="space-y-4">
        <div class="flex flex-col items-center justify-center gap-y-2">
          <div class="text-orange-500">
            <Icon name="svg-spinners:blocks-wave" size="3rem" />
          </div>
          <div class="text-xl">请在 TronLink 钱包中完成支付</div>
        </div>
        <div class="text-sm">
          TronLink钱包会弹出一个支付窗口，请在该窗口中完成支付
        </div>
      </div>
      <div v-else-if="payStatus === 'Success'">
        <div class="flex flex-col items-center justify-center gap-y-2">
          <div class="text-green-500">
            <Icon name="weui:done2-filled" size="3rem" />
          </div>

          <div class="text-xl flex justify-between items-center gap-x-2">
            <div>支付成功</div>
            <div>
              <button
                class="text-sm border px-1.5 py-0.5 bg-green-100 text-teal-600 border-teal-500 rounded"
                @click="emits('payDone')"
              >
                确定
              </button>
            </div>
          </div>
        </div>
      </div>
      <div v-else-if="payStatus === 'Confirm'" class="space-y-4">
        <div class="flex flex-col items-center justify-center gap-y-2">
          <div class="text-orange-500">
            <Icon name="svg-spinners:blocks-wave" size="3rem" />
          </div>
          <div class="text-xl">正在确认交易</div>
        </div>
        <div class="text-sm">区块链确认交易需要一定的时间，请耐心等待</div>
      </div>
      <div v-else-if="payStatus === 'Update'">
        <div class="flex flex-col items-center justify-center gap-y-2">
          <div class="text-orange-500">
            <Icon name="svg-spinners:blocks-wave" size="3rem" />
          </div>
          <div class="text-xl">正在更新订单状态和购买的服务</div>
        </div>
      </div>
      <div v-else-if="payStatus === 'Fail'" class="space-y-4">
        <div class="flex flex-col items-center justify-center gap-y-2">
          <div class="text-red-500">
            <Icon name="weui:close2-filled" size="3rem" />
          </div>
          <div class="flex justify-between items-center gap-x-2">
            <div class="text-xl">支付失败</div>
            <div>
              <button
                class="text-sm border px-1.5 py-0.5 bg-blue-50 text-blue-600 border-blue-200 rounded"
                @click="payStatus = null"
              >
                关闭
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Mask>
</template>
