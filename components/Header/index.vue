<script setup lang="ts">
const { $asideMenu: asideMenu } = use$status();
</script>

<template>
  <header class="shadow-md bg-white">
    <Container class="grid grid-cols-12 items-center gap-x-4 py-3">
      <button
        class="col-span-1 flex flex-col justify-start items-center lg:col-auto lg:hidden"
        @click="asideMenu = true"
      >
        <Icon name="lucide:align-justify" />
      </button>
      <div class="col-start-2 col-span-8 lg:col-start-1 lg:col-span-2">
        <HeaderLogo />
      </div>
      <div class="hidden lg:col-start-3 lg:block lg:col-span-8">
        <HeaderSearchBar />
      </div>
      <div class="col-start-10 col-span-3 lg:col-start-11 lg:col-span-2">
        <HeaderMenu />
      </div>
    </Container>
  </header>
</template>
