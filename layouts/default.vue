<script setup lang="ts">
const { $asideMenu: asideMenu } = use$status();
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
              href=""
              target="_blank"
              class="block lg:transition-all lg:hover:-translate-y-1"
            >
              <Icon name="mdi:github" size="1.85rem" />
            </a>
          </li>

          <li>
            <a
              href=""
              target="_blank"
              class="block lg:transition-all lg:hover:-translate-y-1"
            >
              <Icon name="uil:telegram" size="1.85rem" />
            </a>
          </li>
          <li>
            <a
              href=""
              target="_blank"
              class="block lg:transition-all lg:hover:-translate-y-1"
            >
              <Icon name="ic:outline-email" size="1.85rem" />
            </a>
          </li>
          <li>
            <a
              href=""
              target="_blank"
              class="block lg:transition-all lg:hover:-translate-y-1"
            >
              <Icon name="mingcute:youtube-fill" size="1.85rem" />
            </a>
          </li>
        </ul>

        <div
          class="p-3 text-xs text-center text-gray-600 absolute bottom-1 w-full lg:static"
        >
          &copy; 2021-2024 AXUM中文网
        </div>
      </div>
    </aside>
    <main class="col-span-12 lg:col-start-3 lg:col-span-10">
      <slot></slot>
    </main>
  </Container>
</template>
