<script setup lang="ts">
const route = useRoute();
const { id: idRaw } = route.params;
const id = computed(() => idRaw.toString());
const { $get } = use$fetch();

const loadData = async () => {
  await $get<string>(`/user/subject/slug/${id.value}`, (v) => {
    return navigateTo(`/subject/${v}`) as void;
  });
};

onMounted(() => {
  const t = setTimeout(() => {
    loadData().then();
    clearTimeout(t);
  }, 100);
});
</script>

<template></template>
