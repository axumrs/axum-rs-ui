<script setup lang="ts"></script>

<template>
  <div class="bg-gray-100">
    <Header />
    <div class="relative auth-container my-3"><slot></slot></div>
  </div>
</template>
<style scoped>
.auth-container {
  height: calc(100vh - 62px - 12px);
}
</style>
