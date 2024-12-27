<script setup lang="ts">
const { $asideMenu: asideMenu } = use$status();
const { tgGroup, githubUrl, youtubeUrl, contactEmail } =
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
            class="flex justify-center items-center gap-x-2 p-3 absolute bottom-10 w-full lg:static"
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
            <li>
              <a
                :href="youtubeUrl"
                target="_blank"
                class="block lg:transition-all lg:hover:-translate-y-1"
              >
                <Icon name="mingcute:youtube-fill" size="1.85rem" />
              </a>
            </li>
            <li class="relative group hidden lg:block">
              <button
                class="bg-[#111827] px-0.5 py-1 rounded overflow-hidden -translate-y-[0.135rem] block lg:transition-all lg:hover:-translate-y-2"
              >
                <VeryRealIcon class="h-3" />
              </button>
              <div
                class="invisible opacity-0 absolute z-[1] w-64 border rounded-md bg-gray-100 flex flex-col gap-y-2 justify-center items-center shadow p-3 left-1/2 -translate-x-1/2 top-6 group-hover:visible group-hover:opacity-100 transition-all duration-300"
              >
                <div>打开 VeryReal App 扫码联系</div>
                <div><VeryRealQrCode /></div>
              </div>
            </li>
          </ul>

          <div
            class="p-3 text-xs text-center text-gray-600 absolute bottom-1 w-full lg:static"
          >
            <div>&copy; 2021-2024 AXUM中文网</div>
            <div>
              <a
                :href="`${useRuntimeConfig().public.apiUrl}/rss`"
                target="_blank"
                >RSS</a
              >
            </div>
          </div>
        </div>
      </aside>
    </ClientOnly>
    <main class="col-span-12 lg:col-start-3 lg:col-span-10">
      <slot></slot>
    </main>
  </Container>
</template>
