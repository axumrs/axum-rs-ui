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
    class="fixed left-1/2 top-2 -translate-x-1/2 px-3 py-1.5 border flex flex-col justify-center items-center border-green-500 text-white bg-gradient-to-b from-green-500/90 to-green-600/90 rounded-xl shadow-xl z-10 transition-all duration-300 min-w-max lg:max-w-7xl"
    v-if="show"
  >
    <div>
      <slot>提示</slot>
    </div>
  </div>
</template>
