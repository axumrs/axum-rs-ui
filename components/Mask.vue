<script setup lang="ts">
const emits = defineEmits(["click"]);
</script>

<template>
  <div class="fixed inset-0 bg-black/70" @click.self="emits('click')">
    <slot></slot>
  </div>
</template>
