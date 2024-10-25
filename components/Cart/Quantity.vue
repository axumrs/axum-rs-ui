<script setup lang="ts">
const props = withDefaults(
  defineProps<{ disabledUpdate?: boolean; min?: number; max?: number }>(),
  {
    min: 1,
    max: 96,
  }
);
const modelValue = defineModel<number>({ required: true });

const updateValue = (isDecrement: boolean = false) => {
  if (isDecrement) {
    if (modelValue.value <= props.min) {
      modelValue.value = props.min;
    } else {
      modelValue.value--;
    }
  } else {
    if (modelValue.value >= props.max) {
      modelValue.value = props.max;
    } else {
      modelValue.value++;
    }
  }
};
</script>

<template>
  <div
    class="grid grid-cols-4 gap-x-1 border bg-gray-50 rounded overflow-hidden"
  >
    <div class="flex flex-col items-center justify-center col-span-1">
      <button
        type="button"
        class="flex flex-col items-center justify-center px-1.5 py-0.5 disabled:text-gray-500 disabled:cursor-not-allowed"
        :disabled="disabledUpdate === true"
        @click="updateValue(true)"
      >
        <Icon name="uil:minus" size="0.75rem" />
      </button>
    </div>
    <div class="col-span-2 text-center bg-white px-1.5 py-0.5 border-x">
      {{ modelValue }}
    </div>
    <div class="flex flex-col items-center justify-center col-span-1">
      <button
        type="button"
        class="flex flex-col items-center justify-center px-1.5 py-0.5 disabled:text-gray-500 disabled:cursor-not-allowed"
        :disabled="disabledUpdate === true"
        @click="updateValue()"
      >
        <Icon name="uil:plus" size="0.75rem" />
      </button>
    </div>
  </div>
</template>
