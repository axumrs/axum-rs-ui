<script setup lang="ts">
const props = defineProps<{ contents: string[] }>();
const itemsNum = computed(() => props.contents.length);
const lastIdx = computed(() => itemsNum.value - 1);
const actived = ref(-1);
</script>

<template>
  <div
    class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col justify-between items-start min-h-48 min-w-64 lg:min-h-64 lg:min-w-80"
  >
    <ul class="cursor-pointer">
      <AnnouncementItem
        v-if="contents && contents.length > 0"
        v-for="(content, idx) in contents"
        :content="content"
        :itemsNum="itemsNum"
        :idx="idx"
        :isActived="idx === actived"
        :key="content"
        :class="{
          'item-1': idx === 1,
          'item-2': idx === 2,
          'item-3': idx === 3,
          'item-4': idx === 4,
          'item-5': idx === 5,
          'item-6': idx === 6,
          'item-7': idx === 7,
          'item-8': idx === 8,
          'item-9': idx === 9,
          'item-10': idx === 10,
          'z-10 overflow-y-auto bg-white h-full pb-2 shadow shadow-gray-400':
            actived === idx,
          'z-0 truncate bg-gray-100 h-18 shadow-md shadow-gray-400':
            actived !== idx,
        }"
        @click.self="actived = idx"
        @select="
          (i) => {
            actived = i;
          }
        "
        @prev.self="
          (i) => {
            actived = i;
          }
        "
        @next.self="
          (i) => {
            actived = i;
          }
        "
      />
    </ul>
  </div>
</template>
<style scoped>
.item-1 {
  @apply top-[1rem] left-[1rem];
}
.item-2 {
  @apply top-[2rem] left-[2rem];
}
.item-3 {
  @apply top-[3rem] left-[3rem];
}
.item-4 {
  @apply top-[4rem] left-[4rem];
}
.item-5 {
  @apply top-[5rem] left-[5rem];
}
.item-6 {
  @apply top-[6rem] left-[6rem];
}
.item-7 {
  @apply top-[7rem] left-[7rem];
}
.item-8 {
  @apply top-[8rem] left-[8rem];
}
.item-9 {
  @apply top-[9rem] left-[9rem];
}
.item-10 {
  @apply top-[10rem] left-[10rem];
}
</style>
