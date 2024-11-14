<script setup lang="ts">
defineProps<{ subject: Subject; isPurchased?: boolean }>();
</script>

<template>
  <li class="border rounded-md p-4 bg-white">
    <div class="grid grid-cols-12 items-start gap-x-2">
      <div class="col-span-3 lg:col-span-2">
        <img
          :src="
            subject.cover || 'https://file.axum.rs/icons/rust/rust-plain.svg'
          "
          class="w-[5.5rem] object-cover"
        />
      </div>
      <div class="col-span-9 lg:col-span-10">
        <h3 class="mb-1">
          <NuxtLink
            class="text-lg font-semibold hover:text-red-800"
            :to="`/subject/${subject.slug}`"
            >{{ subject.name }}</NuxtLink
          >
        </h3>
        <div>
          {{ subject.summary }}
        </div>
      </div>
    </div>

    <SubjectMeta
      class="justify-end mt-3"
      :subject="subject"
      :is-purchased="isPurchased"
    />
  </li>
</template>
