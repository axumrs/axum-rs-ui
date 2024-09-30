<script setup lang="ts">
const props = withDefaults(defineProps<{ duration?: number }>(), {
  duration: 3000,
});

const show = ref(true);

const emits = defineEmits(["hide"]);

onMounted(() => {
  const t = setTimeout(() => {
    show.value = false;
    emits("hide");
    clearTimeout(t);
  }, props.duration);
});
</script>

<template>
  <div
    class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/70 p-6 rounded-md shadow-md flex flex-col justify-center items-center text-white min-w-36 max-w-48 z-10"
    v-if="show"
  >
    <div><slot></slot></div>
  </div>
</template>
