<script setup lang="ts">
const handleCancel = () => {
  window.history.back();
};

const { $del } = use$fetch();
const { $msg } = use$status();
const { $setAuth } = use$auth();

const handleLogout = async () => {
  await $del("/user/user/logout", () => {
    $msg.value = "退出成功";
    $setAuth(null);
    return navigateTo("/login") as void;
  });
};
</script>

<template>
  <Mask class="backdrop-blur-sm">
    <div
      class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border p-6 shadow-md rounded-md bg-white space-y-4"
    >
      <div class="text-lg">确定退出本次登录？</div>
      <div class="flex justify-end items-center gap-x-2">
        <button
          class="border rounded-md px-2.5 py-1.5 bg-gray-100 text-sm"
          @click="handleCancel"
        >
          取消
        </button>
        <button
          class="border rounded-md px-2.5 py-1.5 bg-blue-600 text-white text-sm"
          @click="handleLogout"
        >
          确定
        </button>
      </div>
    </div>
  </Mask>
</template>
