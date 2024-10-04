<script setup lang="ts">
defineProps<{ subject: Subject }>();
</script>

<template>
  <section class="flex flex-col gap-y-4 justify-center items-center lg:gap-y-6">
    <div class="flex justify-start items-center gap-x-2">
      <img src="https://file.axum.rs/icons/shop.png" class="w-8 object-cover" />

      <h1 class="text-2xl font-semibold">{{ subject.name }}</h1>
    </div>
    <p>
      {{ subject.summary }}
    </p>
    <div>
      <SubjectMeta :subject="subject" />
    </div>
  </section>
</template>
