import { useSessionStorage } from "@vueuse/core";

export default function use$auth() {
  const token = useSessionStorage("TOKEN", "");

  return { token };
}
