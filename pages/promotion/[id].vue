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

<template></template>
