<script setup lang="ts">
import dayjs from "dayjs";

const { $asideMenu: asideMenu } = use$status();
const { tgGroup, githubUrl, youtubeUrl, contactEmail, qqGroup } =
  useRuntimeConfig().public;
</script>

<template>
  <Mask
    class="lg:hidden transition-all duration-300 z-[10]"
    :class="{
      'hidden opacity-0 invisible': !asideMenu,
      'block opacity-100 visible': asideMenu,
    }"
    @click="asideMenu = false"
  />
  <Header />
  <Container class="grid grid-cols-12 items-start gap-x-4 my-6">
    <ClientOnly>
      <aside
        class="fixed top-0 bottom-0 bg-white transition-all duration-300 shadow-xl border z-[12] lg:z-auto lg:shadow-none lg:rounded-lg lg:opacity-100 lg:visible lg:block lg:static lg:w-full lg:col-start-1 lg:col-span-2"
        :class="{
          'block opacity-100 visible left-0 right-auto w-3/4': asideMenu,
          'hidden opacity-0 invisible left-auto right-0 w-0': !asideMenu,
        }"
      >
        <div class="h-full flex flex-col divide-y">
          <div>
            <AsideMenu />
          </div>

          <ul
            class="grid grid-cols-6 justify-center items-center gap-x-2 pl-5 pr-3 pb-6 pt-3 lg:p-6 lg:gap-2 absolute bottom-10 w-full lg:static lg:grid-cols-4 2xl:grid-cols-6"
          >
            <li>
              <a
                :href="githubUrl"
                target="_blank"
                class="block lg:transition-all lg:hover:-translate-y-1"
              >
                <Icon name="mdi:github" size="1.85rem" />
              </a>
            </li>

            <li>
              <a
                :href="tgGroup"
                target="_blank"
                class="block lg:transition-all lg:hover:-translate-y-1"
              >
                <Icon name="uil:telegram" size="1.85rem" />
              </a>
            </li>
            <li>
              <a
                :href="`mailto:${contactEmail}`"
                target="_blank"
                class="block lg:transition-all lg:hover:-translate-y-1"
              >
                <Icon name="ic:outline-email" size="1.85rem" />
              </a>
            </li>
            <!-- <li>
              <a
                href="https://discord.gg/URxRjDBd"
                target="_blank"
                class="block lg:transition-all lg:hover:-translate-y-1"
              >
                <Icon name="ic:baseline-discord" size="1.85rem" />
              </a>
            </li> -->
            <li>
              <a
                :href="youtubeUrl"
                target="_blank"
                class="block lg:transition-all lg:hover:-translate-y-1"
              >
                <Icon name="mingcute:youtube-fill" size="1.85rem" />
              </a>
            </li>
            <li>
              <a
                :href="qqGroup"
                target="_blank"
                class="block lg:transition-all lg:hover:-translate-y-1"
              >
                <Icon name="basil:qq-solid" size="1.85rem" />
              </a>
            </li>
            <li>
              <a
                href="https://rss.axum.eu.org"
                target="_blank"
                class="block lg:transition-all lg:hover:-translate-y-1"
              >
                <Icon name="uil:rss-interface" size="1.85rem" />
              </a>
            </li>
            <!-- <li class="relative group">
              <button
                class="bg-[#111827] px-0.5 py-1 rounded overflow-hidden -translate-y-[0.135rem] block lg:transition-all lg:hover:-translate-y-2"
              >
                <VeryRealIcon class="h-3" />
              </button>
              <div
                class="invisible opacity-0 absolute z-[1] w-max lg:w-64 border rounded-md bg-gray-100 flex flex-col gap-y-2 justify-center items-center shadow p-3 left-1/2 -translate-x-1/2 -top-20 lg:top-6 group-hover:visible group-hover:opacity-100 transition-all duration-300"
              >
                <div class="hidden lg:block">
                  <div>打开 VeryReal App 扫码联系</div>
                  <div><VeryRealQrCode /></div>
                </div>
                <div class="lg:hidden text-sm">
                  <div>打开 VeryReal App</div>
                  <div>添加：<code>180576</code></div>
                </div>
              </div>
            </li> -->
          </ul>

          <div
            class="p-3 text-xs text-center text-gray-600 absolute bottom-1 w-full lg:static"
          >
            <div>&copy; 2021-{{ dayjs().year() }} AXUM中文网</div>
          </div>
        </div>
      </aside>
    </ClientOnly>
    <main class="col-span-12 lg:col-start-3 lg:col-span-10">
      <slot></slot>
    </main>
  </Container>
</template>
