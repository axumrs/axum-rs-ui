<script setup lang="ts">
const emits = defineEmits(["submit"]);
</script>

<template>
  <form autocomplete="off" @submit.prevent="emits('submit')">
    <slot></slot>
  </form>
</template>
