<script setup lang="ts">
const frm = reactive({
  password: "",
  new_password: "",
  re_password: "",
});

const { $toast, $msg, $isLoading } = use$status();
const { $put } = use$fetch();
const { $user } = use$auth();

const passwordValidator = (p: string, msgPrefix: string) => {
  if (!p.trim()) {
    throw new Error(`${msgPrefix}不能为空`);
  }
  if (p.trim().length < 6) {
    throw new Error(`${msgPrefix}至少6位`);
  }
};
const handleSubmit = async () => {
  try {
    passwordValidator(frm.password, "现用密码");
    passwordValidator(frm.new_password, "新密码");
    passwordValidator(frm.re_password, "确认密码");
    if (frm.password === frm.new_password) {
      throw new Error("新密码不能和现用密码相同");
    }
    if (frm.new_password !== frm.re_password) {
      throw new Error("两次输入的密码不一致");
    }
    await $put("/user/user/password", { ...frm }, () => {
      $msg.value = "密码修改成功";
      $isLoading.value = false;
      return navigateTo("/user/logout") as void;
    });
  } catch (e) {
    if (e instanceof Error) {
      $toast.value = e.message;
    } else if (typeof e === "string") {
      $toast.value = e;
    } else {
      $toast.value = `${e}`;
    }
  }
};
</script>

<template>
  <PageTitle icon="heroicons:key" title="修改密码" />
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
      <div>现用密码</div>
      <div class="border rounded px-3 py-2 focus-within:ring-1">
        <input
          type="password"
          class="block w-full outline-none"
          required
          v-model="frm.password"
        />
      </div>
      <div class="text-gray-400 text-xs">
        输入你现在使用的密码，以验证你的身份。
      </div>
    </label>
    <label class="flex flex-col gap-y-2">
      <div>新密码</div>
      <div class="border rounded px-3 py-2 focus-within:ring-1">
        <input
          type="password"
          class="block w-full outline-none"
          required
          v-model="frm.new_password"
        />
      </div>
      <div class="text-gray-400 text-xs">输入6个字符以上的新密码。</div>
    </label>
    <label class="flex flex-col gap-y-2">
      <div>重复密码</div>
      <div class="border rounded px-3 py-2 focus-within:ring-1">
        <input
          type="password"
          class="block w-full outline-none"
          required
          v-model="frm.re_password"
        />
      </div>
      <div class="text-gray-400 text-xs">再次输入你新密码。</div>
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
