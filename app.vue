<script setup lang="ts">
const { seoTitle, pageMeta } = use$seo();
seoTitle();
pageMeta();

const { isLoading, toast, msg, announcements } = use$status();
</script>

<template>
  <NuxtLayout>
    <NuxtPage :key="useRoute().fullPath" />
  </NuxtLayout>

  <ClientOnly>
    <Loading v-if="isLoading" />
    <Toast v-if="toast" @hide="toast = ''">{{ toast }}</Toast>
    <Message v-if="msg" @hide="msg = ''">{{ msg }}</Message>
    <Announcement
      v-if="announcements && announcements.length > 0"
      :contents="announcements"
  /></ClientOnly>
</template>
