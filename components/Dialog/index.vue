<script setup lang="ts"></script>

<template>
  <Mask class="backdrop-blur-sm">
    <div
      class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg space-y-4 min-w-64 lg:min-w-96"
    >
      <slot name="header"></slot>
      <slot></slot>
      <slot name="footer"></slot>
    </div>
  </Mask>
</template>
