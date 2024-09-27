<script setup lang="ts">
defineProps<{ sitekey: string }>();
import VueHcaptcha from "@hcaptcha/vue3-hcaptcha";
const modelValue = defineModel<string>({ required: true });
</script>

<template>
  <VueHcaptcha
    :sitekey="sitekey"
    @verify="(token:string)=>{modelValue=token;}"
  />
</template>
