<script setup lang="ts">
const frm = reactive({
  password: "",
  allow_device_num: 1,
  session_exp: 20,
});

const { $toast, $msg, $isLoading } = use$status();
const { $put } = use$fetch();
const { $user } = use$auth();

const maxValue = computed(() => {
  let allow_device_num = 1;
  let session_exp = 20;
  if ($user.value) {
    if ($user.value.kind === "YearlySubscriber") {
      allow_device_num = 5;
      session_exp = 300;
    } else if ($user.value.kind === "Subscriber") {
      allow_device_num = 3;
      session_exp = 120;
    }
  }
  return { allow_device_num, session_exp };
});
const handleSubmit = async () => {
  if (frm.password.trim().length < 6) {
    $toast.value = "密码至少6位";
    return;
  }
  if (frm.allow_device_num > maxValue.value.allow_device_num) {
    $toast.value = `最多允许${maxValue.value.allow_device_num}个设备同时在线`;
    return;
  }
  if (frm.session_exp > maxValue.value.session_exp) {
    $toast.value = `会话超时最多允许${maxValue.value.session_exp}分钟`;
    return;
  }
  await $put("/user/user/profile", { ...frm }, () => {
    $msg.value = "修改成功";
    $isLoading.value = false;
    return navigateTo("/user/logout") as void;
  });
};
onMounted(() => {
  const t = setTimeout(() => {
    frm.allow_device_num = $user.value?.allow_device_num || 1;
    frm.session_exp = $user.value?.session_exp || 20;
    clearTimeout(t);
  }, 10);
});
</script>

<template>
  <PageTitle icon="heroicons:user" title="个人信息" />
  <form
    class="my-6 bg-white rounded-md p-6 space-y-4"
    autocomplete="off"
    @submit.prevent="handleSubmit"
    v-if="$user"
  >
    <div class="flex flex-col gap-y-2 cursor-default">
      <div>用户</div>
      <div class="border rounded px-3 py-2 text-gray-500 bg-gray-100">
        {{ $user.email }} ({{ $user.nickname }})
      </div>
    </div>

    <label class="flex flex-col gap-y-2">
      <div>同时登录设备数</div>
      <div class="border rounded px-3 py-2 focus-within:ring-1">
        <input
          type="number"
          class="block w-full outline-none"
          required
          v-model.number="frm.allow_device_num"
        />
      </div>
      <div class="text-gray-400 text-xs">
        年度订阅用户最多可设置5台；订阅用户最多可设置3台；普通用户只允许设置1台。
      </div>
    </label>

    <label class="flex flex-col gap-y-2">
      <div>会话超时时间（分钟）</div>
      <div class="border rounded px-3 py-2 focus-within:ring-1">
        <input
          type="number"
          class="block w-full outline-none"
          required
          v-model.number="frm.session_exp"
        />
      </div>
      <div class="text-gray-400 text-xs">
        年度订阅用户最多可设置300分钟（5小时）；订阅用户最多可设置120分钟（2小时）；普通用户只允许设置20分钟。
      </div>
    </label>

    <label class="flex flex-col gap-y-2">
      <div>密码</div>
      <div class="border rounded px-3 py-2 focus-within:ring-1">
        <input
          type="password"
          class="block w-full outline-none"
          required
          v-model="frm.password"
        />
      </div>
      <div class="text-gray-400 text-xs">本操作需要验证你的密码。</div>
    </label>

    <div class="flex justify-end">
      <button
        type="submit"
        class="border rounded-md px-3 py-1.5 bg-blue-600 text-white lg:hover:bg-blue-500"
      >
        提交
      </button>
    </div>
  </form>
</template>
