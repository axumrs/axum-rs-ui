<script setup lang="ts">
const emits = defineEmits(["cancel", "ok"]);
</script>

<template>
  <Dialog>
    <template #header>
      <slot name="header">
        <div class="text-lg text-gray-500">确认</div>
      </slot>
    </template>
    <template #default>
      <slot></slot>
    </template>
    <template #footer>
      <slot name="footer">
        <div class="flex justify-end items-center gap-x-2">
          <button
            class="rounded bg-gray-200 text-gray-800 px-2.5 py-1.5 hover:bg-gray-300"
            @click="emits('cancel')"
          >
            取消
          </button>
          <button
            class="rounded bg-blue-600 text-white px-2.5 py-1.5 hover:bg-blue-700"
            @click="emits('ok')"
          >
            确定
          </button>
        </div>
      </slot>
    </template>
  </Dialog>
</template>
