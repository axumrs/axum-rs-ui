<script setup lang="ts">
const rtc = useRuntimeConfig();
</script>

<template>
  <PageTitle icon="heroicons:heart" title="小额赞助" />
  <div class="my-6 prose max-w-none lg:prose-lg bg-white rounded-md p-6">
    <p>
      如果你觉得我们的教程给你带来了帮助，可以小额捐助，以支持我们继续提供更优质的服务。
    </p>
    <!-- <h2>USDT/TRX</h2>
    <p>
      钱包地址：<code>{{ rtc.public.wallet_addr }}</code>
    </p>
    <p>
      <img
        :src="rtc.public.wallet_qrcode"
        class="w-64 object-cover"
        alt="TRON钱包二维码"
      />
    </p> -->
    <h2>微信</h2>
    <p>
      <img
        src="https://file.axum.eu.org/wepay.png"
        alt="微信支付"
        class="w-64 object-cover"
      />
    </p>
  </div>
</template>
