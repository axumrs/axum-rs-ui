import Decimal from "decimal.js";

const DIGIT = new Decimal(1);

export default function use$tronLink() {
  const rtc = useRuntimeConfig();
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

  // TRX转账
  const $trx = async (amount: Decimal) => {
    if (!$walletAddress.value) {
      throw new Error("请先连接钱包");
    }
    const toAddress = rtc.public.wallet_addr; // 收款人地址
    const fromAddress = $walletAddress.value!;

    const txAmount = amount.mul(DIGIT);
    // 构建交易
    const tx = await $tron.value.transactionBuilder.sendTrx(
      toAddress,
      txAmount,
      fromAddress
    );
    // 签名
    const signedTx = await $tron.value.trx.sign(tx);
    // 发送交易
    const resp = (await $tron.value.trx.sendRawTransaction(
      signedTx
    )) as TronTransactionResp;
    return resp;
  };

  // USDT转账
  const $usdt = async (amount: Decimal) => {
    if (!$walletAddress.value) {
      throw new Error("请先连接钱包");
    }
    const toAddress = rtc.public.wallet_addr; // 收款人地址
    const txAmount = amount.mul(DIGIT);
    // 智能合约地址
    const contractAddress = rtc.public.usdtContractAddr;

    // 获取智能合约实例
    const instance = await $tron.value.contract().at(contractAddress);

    // 转账
    const txId = await instance
      .transfer(toAddress, txAmount.toString())
      .send({});
    return txId;
  };

  return {
    $installedTronLink,
    $tron,
    $isConnected,
    $walletAddress,
    $connect,
    $trx,
    $usdt,
  };
}
