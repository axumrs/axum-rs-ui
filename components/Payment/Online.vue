<script setup lang="ts">
const { $installedTronLink, $tron, $isConnected, $walletAddress, $connect } =
  use$tronLink();
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
        <div>
          你已连接 TronLink 钱包，当前钱包地址:
          <code>{{ $walletAddress }}</code>
        </div>
        <div>
          <button
            class="border rounded-md px-2.5 py-1.5 bg-purple-600 text-white"
          >
            支付
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

  <ClientOnly>
    <!-- <PaymentTronLink /> -->
  </ClientOnly>
</template>
