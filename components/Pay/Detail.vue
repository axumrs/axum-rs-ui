<script setup lang="ts">
import dayjs from "dayjs";

defineProps<{ pay: Pay }>();

const emits = defineEmits(["rePay"]);
const tronUrl = useRuntimeConfig().public.tronUrl;
</script>

<template>
  <div
    v-if="pay.status !== 'Success'"
    class="flex justify-center items-center gap-x-2 p-3 rounded-md bg-red-100 text-red-600"
  >
    <div class="text-lg">该支付尚未完成</div>
    <div>
      <button
        @click="emits('rePay')"
        class="rounded px-1.5 py-0.5 bg-teal-600 text-white"
      >
        重新支付
      </button>
    </div>
  </div>
  <ul class="grid grid-cols-1 lg:grid-cols-2 gap-3">
    <li class="flex justify-start items-center gap-x-2">
      <div>支付方式：</div>
      <div>在线支付</div>
    </li>
    <li class="flex justify-start items-center gap-x-2">
      <div>支付金额：</div>
      <div>{{ pay.amount }} {{ pay.currency }}</div>
    </li>
    <li class="flex justify-start items-center gap-x-2">
      <div class="shrink-0">交易号：</div>
      <div class="truncate">
        <!-- https://tronscan.org/#/transaction/019dd64882df1cbe30f0bd7d6316a26907edc4cdd27dcfd263cceaa28584dd6c -->
        <a
          class="font-mono text-xs underline decoration-dotted"
          target="_blank"
          :href="`${tronUrl}/transaction/${pay.tx_id}`"
          >{{ pay.tx_id }}</a
        >
      </div>
    </li>
    <li class="flex justify-start items-center gap-x-2">
      <div>支付时间：</div>
      <div>
        <span>{{ dayjs(pay.dateline).format("YYYY-MM-DD HH:mm:ss") }}</span>
      </div>
    </li>

    <li class="flex justify-start items-center gap-x-2" v-if="pay.is_via_admin">
      <div
        class="text-sm border px-1 py-0.5 bg-yellow-50 text-orange-600 border-orange-300 rounded"
      >
        该订单由管理员后台处理支付。<span v-if="pay.approved_opinion"
          >处理意见：{{ pay.approved_opinion }}，处理时间：{{
            dayjs(pay.approved_time).format("YYYY-MM-DD HH:mm:ss")
          }}</span
        >
      </div>
    </li>
  </ul>
</template>
