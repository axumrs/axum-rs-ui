<script setup lang="ts">
const { id: idRaw } = useRoute().params;
const id = idRaw.toString();

const { $get } = use$fetch();

onMounted(async () => {
  setTimeout(async () => {
    await $get<Promotion>(`/user/promotion/${id}`, (v) => {
      if (v) {
        navigateTo(v.url, { external: true });
      }
    });
  }, 100);
});
</script>

<template>
  <div
    class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-y-2 text-purple-700"
  >
    <Icon name="codex:loader" size="2.5rem" />
    <div class="animate-pulse text-lg">正在跳转，请稍后</div>
  </div>
</template>
