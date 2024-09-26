<script setup lang="ts"></script>

<template>
  <ul class="grid grid-cols-2 gap-3 lg:grid-cols-4">
    <TagListItem v-for="i in 30" :key="`tag-item-${i}`" />
  </ul>
</template>
