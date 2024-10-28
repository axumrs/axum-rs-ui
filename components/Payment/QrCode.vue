<script setup lang="ts">
const rtc = useRuntimeConfig();
</script>

<template>
  <div class="space-y-4">
    <div>
      收款地址：<code>{{ rtc.public.wallet_addr }}</code>
    </div>
    <div>
      <img
        :src="rtc.public.wallet_qrcode"
        class="w-48 object-cover"
        alt="钱包地址二维码"
      />
    </div>
    <ul class="space-y-2 list-decimal list-inside">
      <li>完成支付后，请填写支付证明，否则无法处理</li>
      <li>该支付方式需要管理员手动确认订单</li>
      <li>请再三确认收款地址已我们的钱包地址</li>
      <li>我们只接受 USDT(TRC 20)，请不要转账其他代币</li>
      <li>
        推荐使用
        <a
          href="https://www.tronlink.org/cn/dlDetails/"
          target="_blank"
          class="underline decoration-dotted"
          >TronLink钱包</a
        >
      </li>
      <li>如果长时间未进行处理，请联系站长</li>
    </ul>
  </div>
</template>
