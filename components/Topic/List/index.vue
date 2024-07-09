<script setup lang="ts"></script>

<template>
  <ul class="flex flex-col gap-y-3">
    <TopicListItem
      v-for="i in 30"
      :key="`topic-item-${i}`"
      :hidden-subject="i % 2 === 1"
      :try-read="i % 3 === 1"
    />
  </ul>
</template>
