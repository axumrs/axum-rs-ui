<script setup lang="ts">
type CaptchaKind = "HCaptcha" | "Turnstile";

const props = defineProps<{
  kind?: CaptchaKind;
  sitekey?: string;
  action?: string;
}>();

const rc = useRuntimeConfig();

const sitekey = computed(() => {
  if (props.sitekey) {
    return props.sitekey;
  }

  return props.kind === "Turnstile"
    ? rc.public.turnstileSiteKey
    : rc.public.hcaptchaSiteKey;
});

const modelValue = defineModel<string>({ required: true });
</script>

<template>
  <CaptchaTurnstile
    v-if="kind === 'Turnstile'"
    :sitekey="sitekey"
    v-model="modelValue"
    :action="action"
  />
  <CaptchaHCaptcha v-else :sitekey="sitekey" v-model="modelValue" />
</template>
