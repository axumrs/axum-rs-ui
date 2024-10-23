<script setup lang="ts">
import dayjs from "dayjs";
import Decimal from "decimal.js";

const { $user } = use$auth();

const { $get } = use$fetch();

const { $msg } = use$status();

const points = ref<Decimal>(new Decimal($user.value?.points || "0"));
const sessionList = ref<Session[]>([]);
const loginLogList = ref<LoginLog[]>([]);

const handleCheckIn = async () => {
  if ($user.value) {
    $get<number>("/user/user/check-in", (v) => {
      if (v) {
        points.value = points.value.add(new Decimal(v));
        $msg.value = `签到成功，获得${v}积分`;
      }
    });
  }
};

const loadSessions = async () => {
  await $get<Session[]>("/user/user/sessions", (v) => {
    if (v) {
      sessionList.value = v || [];
    }
  });
};

const loadLoginLogs = async () => {
  await $get<LoginLog[]>("/user/user/login-logs", (v) => {
    if (v) {
      loginLogList.value = v || [];
    }
  });
};

await Promise.all([loadSessions(), loadLoginLogs()]);
</script>

<template>
  <PageTitle title="个人中心" icon="heroicons:identification" />
  <div
    class="my-6 border px-2.5 py-1.5 rounded bg-white/70 text-gray-600 flex justify-start items-center gap-x-2 text-sm"
  >
    <Icon name="uil:info-circle" size="1.25rem" />
    <span
      >每个账号有登录设备数量限制，请通过正常途径退出登录，以免影响下一次登录。</span
    >
  </div>

  <UserProfileBox class="my-6">
    <template #header>
      <div class="flex justify-start items-center gap-x-2">
        <h3 class="text-lg font-normal">个人信息</h3>
        <button
          class="rounded-full border px-2 py-0.5 text-sm text-blue-600 border-blue-600 hover:bg-gray-50"
          @click="handleCheckIn"
        >
          签到
        </button>
      </div>
    </template>

    <ul class="grid grid-cols-2 grid-rows-2 gap-y-4">
      <li class="flex justify-start items-center gap-x-2">
        <div>账户类型：</div>
        <div>
          <span
            v-if="$user?.kind === 'YearlySubscriber'"
            class="px-1.5 py-0.5 text-white bg-gradient-to-br from-rose-500 to-rose-600 shadow-sm"
            >年度订阅用户</span
          >
          <span
            v-else-if="$user?.kind === 'Subscriber'"
            class="px-1.5 py-0.5 text-white bg-gradient-to-br from-teal-500 to-teal-600 shadow-sm"
            >订阅用户</span
          >
          <span v-else class="px-1.5 py-0.5">普通用户</span>
        </div>
      </li>
      <li class="flex justify-start items-center gap-x-2">
        <div>订阅到期时间：</div>
        <div>
          <span v-if="$user?.kind !== 'Normal'"
            >{{
              dayjs($user?.sub_exp)
                .locale("zh-cn")
                .format("YYYY-MM-DD HH:mm:ss")
            }}
          </span>
          <span v-else>N/A</span>
        </div>
      </li>
      <li class="flex justify-start items-center gap-x-2">
        <div>注册时间：</div>
        <div>
          <span>{{
            dayjs($user?.dateline).format("YYYY-MM-DD HH:mm:ss")
          }}</span>
        </div>
      </li>
      <li class="flex justify-start items-center gap-x-2">
        <div>积分：</div>
        <div>
          <span>{{ points }}</span>
        </div>
      </li>
    </ul>
  </UserProfileBox>

  <UserProfileBox class="my-6">
    <template #header>
      <h3 class="text-lg font-normal">在线设备</h3>
    </template>
    <div class="prose max-w-none overflow-x-auto">
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>令牌</th>
            <th>IP</th>
            <th>过期时间</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="s in sessionList" v-if="sessionList && sessionList.length">
            <td class="font-mono">{{ s.id.toUpperCase() }}</td>
            <td class="font-mono">{{ s.token }}</td>
            <td>{{ s.ip }}</td>
            <td>{{ dayjs(s.expire_time).format("YYYY-MM-DD HH:mm:ss") }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </UserProfileBox>

  <UserProfileBox class="my-6">
    <template #header>
      <h3 class="text-lg font-normal">登录记录</h3>
    </template>
    <div class="prose max-w-none overflow-x-auto">
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>登录时间</th>
            <th>IP</th>
            <th>用户代理</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="s in loginLogList"
            v-if="loginLogList && loginLogList.length"
          >
            <td class="font-mono">{{ s.id.toUpperCase() }}</td>
            <td>{{ dayjs(s.dateline).format("YYYY-MM-DD HH:mm:ss") }}</td>
            <td>{{ s.ip }}</td>
            <td>{{ s.user_agent }}</td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  </UserProfileBox>
</template>
