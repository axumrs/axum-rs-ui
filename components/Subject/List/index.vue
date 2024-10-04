<script setup lang="ts">
defineProps<{ list: Subject[] }>();
</script>

<template>
  <ul class="grid grid-cols-1 gap-3 lg:grid-cols-2">
    <SubjectListItem v-for="i in list" :key="i.id" :subject="i" />
  </ul>
</template>
