import dayjs from "dayjs";

export default function use$auth() {
  const _auth = useCookie<Auth | null>("AUTH");
  const $token = computed(() => _auth.value?.token || null);
  const $user = computed(() => _auth.value?.user || null);
  const $setAuth = (auth: Auth | null) => {
    _auth.value = auth;
  };

  const $isValid = computed(() => {
    if (!$token.value) {
      return false;
    }
    if (!$user.value) {
      return false;
    }
    return dayjs(_auth.value?.expire_time).isAfter(dayjs());
  });

  return { $token, $user, $setAuth, $isValid };
}
