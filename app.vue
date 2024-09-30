<script setup lang="ts">
const { seoTitle, pageMeta } = use$seo();
seoTitle();
pageMeta();
</script>

<template>
  <NuxtLayout>
    <NuxtPage :key="useRoute().fullPath" />
  </NuxtLayout>

  <Loading v-if="false" />
  <Toast v-if="false"></Toast>
  <Message v-if="false"></Message>
  <Announcement
    v-if="false"
    :contents="
      [1, 2, 3].map(
        (i) =>
          `${i}-公告公告公告公告公告公告公告公告公告公告公告公告公告公告公告公告公告公告公告公告公告公告公告公告公告公告公告公告公告公告公告公告公告公告公告公告公告公告公告公告公告公告公告公告公告公告公告公告公告公告公告公告公告公告公告公告公告公告公告公告公告公告公告公告公告公告公告公告公告公告公告公告公告公告公告公告公告公告公告公告公告公告公告公告公告公告公告公告公告公告公告公告公告公告公告公告公告公告公告公告公告公告公告公告公告公告公告公告公告公告公告公告公告公告公告公告公告公告公告公告公告公告公告公告公告公告`
      )
    "
  />
</template>
