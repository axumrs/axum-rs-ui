<script setup lang="ts">
const props = defineProps<{
  content: string;
  itemsNum: number;
  idx: number;
  isActived: boolean;
}>();

const isFirst = computed(() => props.idx === 0);
const isLast = computed(() => props.idx === props.itemsNum - 1);
const emits = defineEmits(["next", "prev", "select"]);
</script>

<template>
  <li
    class="absolute p-4 border rounded-md w-full overflow-hidden hover:bg-gray-50 flex flex-col gap-y-1 divide-y"
    :title="content.substring(0, 10)"
  >
    <div
      :class="{
        'grow overflow-y-auto ': isActived,
        'truncate ': !isActived,
      }"
      @click="emits('select', idx)"
    >
      {{ content }}
    </div>
    <div
      class="shrink-0 flex justify-between items-center gap-x-2 pt-1.5"
      v-if="isActived"
    >
      <button
        :disabled="isFirst"
        class="disabled:cursor-not-allowed"
        @click="emits('prev', idx - 1)"
      >
        <Icon name="mingcute:left-fill" />
      </button>
      <button
        :disabled="isLast"
        class="disabled:cursor-not-allowed"
        @click="emits('next', idx + 1)"
      >
        <Icon name="mingcute:right-fill" />
      </button>
    </div>
  </li>
</template>
