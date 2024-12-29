<script setup lang="ts">
import Mask from "./Mask.vue";

const toNewDomainCookie = useCookie<boolean>("TO_NEW_DOMAIN");
</script>

<template>
  <Mask class="z-[100]" v-if="toNewDomainCookie !== true">
    <section
      class="absolute bg-white p-6 left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 border rounded space-y-4 w-11/12 lg:max-w-max lg:w-fit lg:text-lg"
    >
      <div>
        域名 <span class="domain">AXUM.RS</span>
        将于<u>2025年10月</u>到期。我们无意再对其进行续费，我们希望你能够接续这个域名，让更多
        AXUM 爱好者继续受益。
      </div>
      <ul class="space-y-2">
        <li>
          <span class="plan">方案1️⃣</span>：<span class="domain">AXUM.RS</span>
          域名 =
          <span class="price">3000</span>
        </li>
        <li>
          <span class="plan">方案2️⃣</span>：<span class="domain">AXUM.RS</span>
          域名 + <span class="item">本站所有专题原始 Markdown 文档</span> =
          <span class="price">5000</span>
        </li>
        <li>
          <span class="plan">方案3️⃣</span>：<span class="plan">方案2️⃣</span> +
          <span class="item">本站原始数据库</span> =
          <span class="price">5500</span>
        </li>
      </ul>
      <div class="space-y-1">
        <div>如果你有意接续这份 AXUM 情怀，请与我们取得联系。</div>
        <ul class="space-y-2 list-disc pl-6">
          <li>
            TG：<a href="https://t.me/yitea" target="_blank" class="link"
              ><code>@yitea</code></a
            >
          </li>
          <li>
            VeryReal：<a
              href="https://www.veryreal.ai"
              target="_blank"
              class="link"
            >
              <code>180576</code>
            </a>
          </li>
          <li>
            Email：<a href="mailto:axum.rs@gmail.com" class="link"
              ><code>axum.rs@gmail.com</code></a
            >
          </li>
        </ul>
      </div>
      <div class="space-y-1 border-y py-3 text-gray-600">
        <div>说明：</div>
        <ol class="space-y-2 list-decimal pl-6">
          <li>
            如果有人购买 <span class="domain">AXUM.RS</span> 域名（<span
              class="plan"
              >方案1️⃣</span
            >），或者该域名到期，本站将启用新的免费域名继续提供服务。
          </li>
          <li>
            如果有人购买了
            <span class="domain">AXUM.RS</span>
            域名，且同时购买了内容和/或数据库（<span class="plan">方案2️⃣</span
            >/<span class="plan">方案3️⃣</span
            >），本站将关闭。届时我们或许会以另一种方式与你再相遇。
          </li>
        </ol>
      </div>
      <div class="flex justify-end">
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

<style lang="css" scoped>
.link {
  @apply underline underline-offset-4;
}
.domain {
  @apply font-mono px-1 py-0.5 text-sm rounded bg-[#9200A2] text-white;
}
.item {
  @apply font-mono px-1 py-0.5 text-sm rounded bg-teal-700 text-white;
}
.price {
  @apply relative font-mono px-1 py-0.5 text-sm rounded bg-sky-700 text-white after:absolute after:ml-2 after:w-max after:text-gray-500 after:top-1/2 after:-translate-y-1/2 after:content-['元人民币'] after:text-xs;
}
.plan {
  @apply before:content-['['] after:content-[']'] before:text-gray-400 after:text-gray-400 before:mr-1 after:ml-1 underline underline-offset-8 decoration-gray-300 decoration-dashed;
}
</style>
