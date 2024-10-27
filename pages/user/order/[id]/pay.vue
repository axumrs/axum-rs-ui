<script setup lang="ts">
const { id } = useRoute().params;
const { $get } = use$fetch();

const loadData = async () => {};

await loadData();
</script>

<template>
  <PageTitle icon="heroicons:credit-card" title="付款" />
</template>
