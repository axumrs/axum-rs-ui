<script setup lang="ts">
const { slug: _slug } = useRoute().params;
const slug = computed(() => _slug.toString());

const loadData = async () => {};
await loadData();
</script>

<template>
  <SubjectDetail />
</template>
