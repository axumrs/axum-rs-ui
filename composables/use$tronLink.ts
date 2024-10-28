export default function use$tronLink() {
  // @ts-ignore
  const $tronLink = window.tronLink;

  const $installedTronLink = computed(() => $tronLink !== undefined);

  const $isConnected = ref<boolean>($tronLink && $tronLink.ready);

  const $tron = computed(() => {
    if (!$installedTronLink.value) {
      return undefined;
    }
    // @ts-ignore
    return $tronLink.tronWeb;
  });

  const $walletAddress = computed(
    () => $tron.value?.defaultAddress.base58 || null
  );

  const $connect = async () => {
    if (!$installedTronLink.value) {
      throw new Error("请安装TronLink");
    }
    // @ts-ignore
    if ($tronLink.ready) {
      return;
    }
    // @ts-ignore
    const resp = await $tronLink.request({ method: "tron_requestAccounts" });
    $isConnected.value = resp.code === 200;
  };

  return { $installedTronLink, $tron, $isConnected, $walletAddress, $connect };
}
