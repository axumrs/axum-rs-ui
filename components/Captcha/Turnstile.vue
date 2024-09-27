<script setup lang="ts">
import VueTurnstile from "vue-turnstile";
defineProps<{ sitekey: string; action?: string }>();
const modelValue = defineModel<string>({ required: true });
</script>

<template>
  <VueTurnstile :site-key="sitekey" v-model="modelValue" :action="action" />
</template>
