<script setup lang="ts"></script>

<template>
  <div class="bg-white p-6 space-y-6 border rounded-md">
    <div>
      <slot name="header"></slot>
    </div>
    <div>
      <slot></slot>
    </div>
  </div>
</template>
