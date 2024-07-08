<script setup lang="ts"></script>

<template>
  <Header />
  <Container class="grid grid-cols-12 items-start gap-x-4 my-6">
    <aside
      class="fixed left-0 top-0 w-3/4 lg:col-start-1 lg:col-span-2 bg-red-50"
    >
      a
    </aside>
    <main class="col-span-12 lg:col-start-3 lg:col-span-10 bg-green-50">
      <slot></slot>
    </main>
  </Container>
</template>
