<script setup lang="ts">
import VueTurnstile from "vue-turnstile";
defineProps<{ sitekey: string; action?: string }>();
const modelValue = defineModel<string>({ required: true });
const emits = defineEmits(["willClear"]);

const willClear = () => {
  emits("willClear");
};
</script>

<template>
  <VueTurnstile
    :site-key="sitekey"
    v-model="modelValue"
    :action="action"
    @error="willClear"
    @expired="willClear"
  />
</template>
