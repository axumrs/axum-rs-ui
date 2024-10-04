<script setup lang="ts">
defineProps<{ subject: Subject }>();
</script>

<template>
  <li
    class="grid grid-cols-12 items-center gap-x-2 p-3 rounded-lg bg-zinc-100 hover:bg-zinc-200"
  >
    <div class="col-span-2 lg:col-span-1">
      <img
        :src="subject.cover || 'https://file.axum.rs/icons/rust/rust-plain.svg'"
        class="w-full object-cover"
      />
    </div>
    <div class="col-span-10 lg:col-span-11">
      <h3>
        <NuxtLink
          class="block w-full font-semibold hover:underline lg:text-lg"
          :to="`/subject/${subject.slug}`"
          >{{ subject.name }}</NuxtLink
        >
      </h3>
      <div class="truncate">{{ subject.summary }}</div>
    </div>
  </li>
</template>
