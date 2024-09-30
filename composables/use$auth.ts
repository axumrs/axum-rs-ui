import { useSessionStorage } from "@vueuse/core";

export default function use$auth() {
  const _auth = useSessionStorage<Auth>("AUTH", null);
  const $token = computed(() => _auth.value?.token || null);
  const $user = computed(() => _auth.value?.user || null);
  const $setAuth = (auth: Auth | null) => {
    _auth.value = auth;
  };

  return { $token, $user, $setAuth };
}
