<script setup lang="ts"></script>

<template>
  <ul class="grid grid-cols-1 gap-3 lg:grid-cols-2">
    <SubjectListItem v-for="i in 30" :key="`subject-item-${i}`" />
  </ul>
</template>
