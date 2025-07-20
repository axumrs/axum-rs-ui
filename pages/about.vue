<script setup lang="ts">
const rtc = useRuntimeConfig();
</script>

<template>
  <PageTitle icon="heroicons:light-bulb" title="关于我们" />
  <div class="my-6 prose max-w-none lg:prose-lg bg-white rounded-md p-6">
    <p>
      AXUM 中文网为你提供了使用 axum 进行企业级 Web
      开发中所需要的大部分知识。从基础知识到企业级项目的开发，都有完整的系列教程。更难得的是，除了文字教程，我们还录制了配套的视频教程，方便你以多种形式进行学习。
    </p>
    <h2 id="技术栈">技术栈</h2>
    <p>本站使用了大量的开源、免费项目，对这些项目表示感谢。</p>
    <h3 id="后端">后端</h3>
    <ul>
      <li><a href="https://rust-lang.org">Rust</a></li>
      <li><a href="https://github.com/tokio-rs/axum">Axum</a></li>
      <li><a href="https://www.postgresql.org">PostgreSQL</a></li>
    </ul>
    <blockquote>
      <p>
        更多依赖请参见<a
          href="https://github.com/axumrs/axum-rs/blob/main/Cargo.toml"
          ><code>Cargo.toml</code></a
        >文件
      </p>
    </blockquote>
    <h3 id="前台ui">前台UI</h3>
    <ul>
      <li><a href="https://cn.vuejs.org/">Vue</a></li>
      <li><a href="https://nuxt.com">Nuxt</a></li>
      <li><a href="https://tailwindcss.com">Tailwind CSS</a></li>
    </ul>
    <blockquote>
      <p>
        更多依赖请参见<a
          href="https://github.com/axumrs/axum-rs-ui/blob/main/package.json"
          ><code>package.json</code></a
        >文件
      </p>
    </blockquote>
    <h3 id="后台ui">后台UI</h3>
    <ul>
      <li><a href="https://cn.vuejs.org/">Vue</a></li>
      <li><a href="https://nuxt.com">Nuxt</a></li>
      <li><a href="https://tailwindcss.com">Tailwind CSS</a></li>
      <li><a href="https://ui.nuxt.com">Nuxt UI</a></li>
    </ul>
    <blockquote>
      <p>
        更多依赖请参见<a
          href="https://github.com/axumrs/axum-rs-admin-ui/blob/main/package.json"
          ><code>package.json</code></a
        >文件
      </p>
    </blockquote>
    <h2 id="开源">开源</h2>
    <ul>
      <li><a href="https://github.com/axumrs/axum-rs">后端</a></li>
      <li><a href="https://github.com/axumrs/axum-rs-ui">前台UI</a></li>
      <li><a href="https://github.com/axumrs/axum-rs-admin-ui">后台UI</a></li>
    </ul>
    <h2 id="联系我们">联系我们</h2>
    <ul>
      <li>
        QQ群：<a :href="rtc.public.qqGroup"
          ><code>{{ rtc.public.qqGroupNum }}</code></a
        >
      </li>
      <li>
        TG群：<a :href="rtc.public.tgGroup"
          ><code>{{ rtc.public.tgGroup }}</code></a
        >
      </li>
      <li>
        Discord：<a href="https://discord.gg/URxRjDBd" target="_blank"
          ><code>https://discord.gg/URxRjDBd</code></a
        >
      </li>
      <li>
        邮件：<a :href="`mailto://${rtc.public.contactEmail}`"
          ><code>{{ rtc.public.contactEmail }}</code></a
        >
      </li>
      <li>
        博客：<a href="https://dev.to/axum" target="_blank"
          ><code>https://dev.to/axum</code></a
        >
      </li>
      <li>
        VeryReal：<code>180576</code>，你可以直接扫描下面的二维码：
        <div>
          <VeryRealQrCode class="w-36" />
        </div>
      </li>
    </ul>
    <!-- <h2 id="赞助我们">赞助我们</h2>
    <ul>
      <li>
        USDT/TRX：<code>{{ rtc.public.wallet_addr }}</code>
      </li>
    </ul> -->
    <h2>感谢</h2>
    <p>
      承蒙各位大善人的无私奉献，本站才得以用最低成本提供服务。我们对这些服务商表示由衷地感谢！
    </p>
    <ul>
      <li><p>Oracle Cloud：提供免费服务器</p></li>
      <li><p>Cloudflare：提供免费 CDN 服务、SSL 证书和人机验证</p></li>
      <li><p>Backblaze：提供免费对象存储</p></li>
      <li><p>Serv00：提供免费域名邮箱</p></li>
      <li>
        <p>我们发送邮箱验证码的免费邮箱由以下服务商提供</p>
        <ul>
          <li>COCK.LI</li>
          <li>INLEED.XYZ</li>
          <li>PISSMAIL.COM</li>
          <li>CT8.PL</li>
          <li>MAIL.EE</li>
        </ul>
      </li>
      <li>
        <p>我们的免费域名由以下服务商提供</p>
        <ul>
          <li>EU.ORG</li>
          <li>PP.UA</li>
          <li>NYC.MN</li>
          <li>NOW.CC</li>
        </ul>
      </li>
    </ul>
  </div>
</template>
