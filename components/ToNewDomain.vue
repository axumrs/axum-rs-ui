<script setup lang="ts">
import Mask from "./Mask.vue";

const toNewDomainCookie = useCookie<boolean>("TO_NEW_DOMAIN");

// onMounted(() => {
//   const t = setTimeout(() => {
//     toNewDomainCookie.value = true;
//     clearTimeout(t);
//   }, 20000);
// });
</script>

<template>
  <Mask class="z-[100]" v-if="toNewDomainCookie !== true">
    <section
      class="absolute bg-white p-6 left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 border rounded-md shadow-md space-y-4 w-11/12 h-3/5 flex flex-col lg:max-w-max lg:w-fit lg:text-lg lg:h-96 2xl:h-auto"
    >
      <div class="grow overflow-y-auto space-y-4">
        <div>
          域名 AXUM.RS 将于 2025 年 10
          月到期。我们无意再对其进行续费，如果你有意接续这个域名，请与我们取得联系。
        </div>
        <ul class="space-y-2 list-disc pl-6">
          <li>
            AXUM.RS 现仅需人民币 3000 元（大写：叁仟元整。<span
              class="italic text-sm"
              >接受适度议价</span
            >）
          </li>
          <li>
            按照行业规则，AXUM.RS
            到期后，大概率会进入长时间的赎回期，该期间内，如果你想拥有该域名，将要付出高额的费用
          </li>
          <li>我们已启用 AXUM.EU.ORG 域名，并将持续运营</li>
          <li>仅接受微信或支付宝交易</li>
        </ul>
        <div>如果你对 AXUM.RS 有兴趣，请和我们进行联系：</div>
        <ul class="space-y-2 list-disc pl-6">
          <li>
            TG：<a href="https://t.me/yitea" target="_blank"
              ><code>@yitea</code></a
            >
          </li>

          <li>
            Email：<a href="mailto:axum.rs@gmail.com"
              ><code>axum.rs@gmail.com</code></a
            >
          </li>
        </ul>
      </div>
      <div class="flex justify-end shrink-0 border-t pt-4">
        <button
          type="button"
          class="rounded px-3 py-1.5 bg-zinc-900 text-white text-sm"
          @click="toNewDomainCookie = true"
        >
          知道了
        </button>
      </div>
    </section>
  </Mask>
</template>
