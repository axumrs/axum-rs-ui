<script setup lang="ts">
defineProps<{ sitekey: string }>();
import VueHcaptcha from "@hcaptcha/vue3-hcaptcha";
const modelValue = defineModel<string>({ required: true });

const emits = defineEmits(["willClear"]);

const willClear = () => {
  emits("willClear");
};
</script>

<template>
  <VueHcaptcha
    :sitekey="sitekey"
    @verify="(token:string)=>{modelValue=token;}"
    @error="willClear"
    @expired="willClear"
    @challengeExpired="willClear"
    @reset="willClear"
  />
</template>
