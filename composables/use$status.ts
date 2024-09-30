import { useLocalStorage, useSessionStorage } from "@vueuse/core";

export default function use$status() {
  const asideMenu = useSessionStorage("ASIDE-MENU", false);
  const toast = useSessionStorage("TOAST", "");
  const msg = useSessionStorage("MSG", "");
  const isLoading = useSessionStorage("IS-LOADING", false);
  const announcements = useLocalStorage("ANNOUNCEMENT", []);

  return { asideMenu, toast, msg, isLoading, announcements };
}
