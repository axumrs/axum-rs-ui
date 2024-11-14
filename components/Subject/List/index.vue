<script setup lang="ts">
defineProps<{
  list: Subject[];
  purchasedSubjects?: { [key: string]: boolean };
}>();
</script>

<template>
  <ul class="grid grid-cols-1 gap-3 lg:grid-cols-2">
    <SubjectListItem
      v-for="i in list"
      :key="i.id"
      :subject="i"
      :is-purchased="purchasedSubjects?.[i.id] || false"
    />
  </ul>
</template>
