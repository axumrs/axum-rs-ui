<script setup lang="ts">
import { NuxtLink } from "#components";
defineProps<{ icon: string; href?: string }>();
const { $asideMenu } = use$status();

const emits = defineEmits(["click"]);
</script>

<template>
  <li
    class="w-full"
    @click="
      () => {
        $asideMenu = false;
        emits('click');
      }
    "
  >
    <component
      :is="href ? NuxtLink : 'button'"
      :to="href"
      class="flex justify-start items-center text-lg gap-x-3 font-normal w-full pl-10 py-2 hover:bg-gray-100 lg:px-8"
    >
      <Icon :name="icon" class="" size="1.45rem" />

      <div>
        <slot></slot>
      </div>
    </component>
  </li>
</template>
