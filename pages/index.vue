<script setup lang="ts"></script>

<template>
  <HomeBox title="专题列表" href="/subject" more-text="全部专题">
    <SubjectTop />
  </HomeBox>

  <HomeBox title="热门文章" href="/topic" more-text="全部文章" class="my-3">
    <TopicList />
  </HomeBox>
</template>
