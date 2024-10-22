<script setup lang="ts"></script>

<template>
  <div class="bg-gray-100">
    <Header />
    <div class="auth-container"><slot></slot></div>
  </div>
</template>
<style scoped>
.auth-container {
  /* height: calc(100vh - 62px - 12px); */
  @apply my-6 min-h-full;
}
</style>
