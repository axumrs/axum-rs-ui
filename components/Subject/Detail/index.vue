<script setup lang="ts">
defineProps<{ topicList: TopicWithSubjectAndTags[]; subject: Subject }>();
</script>

<template>
  <SubjectDetailHero class="p-3 mb-3 lg:mb-6" :subject="subject" />

  <section
    class="bg-white/90 border rounded-lg mb-3"
    v-if="topicList.length > 0"
  >
    <TopicList
      :hiddenSubject="true"
      :topicList="topicList"
      :itemWithBorder="false"
      :divide="true"
    />
  </section>
  <div
    v-else
    class="flex flex-col items-center p-6 text-lg bg-gradient-to-b border rounded from-gray-100 to-gray-100/50 w-11/12 gap-y-2 lg:w-1/4 mx-auto"
  >
    <Icon name="uil:annoyed-alt" size="2rem" class="text-gray-500" />
    <span>该专题下暂时没有文章</span>
  </div>
</template>
