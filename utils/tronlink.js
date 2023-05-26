export const TronWebError = (code, message) => ({ code, message });
export const TronWebErrorCode = {
  NoTronLink: 1,
  RequestAccounts: 2,
  NoConnectTronLink: 3,
  SendFailed: 4,
};
export const getTronWeb = (setTronWeb, errHandler) => {
  const t = setInterval(() => {
    try {
      if (window.tronLink) {
        if (window.tronLink.ready) {
          setTronWeb(window.tronLink.tronWeb);
          return;
        } else {
          window.tronLink
            .request({
              method: "tron_requestAccounts",
              params: {
                websiteIcon: "https://file.axum.rs/asset/logo.png",
                websiteName: "AXUM中文网",
              },
            })
            .then((res) => {
              console.log("res:", res);
              if (res && res?.code === 200) {
                setTronWeb(window.tronLink.tronWeb);
                return;
              } else {
                errHandler(
                  TronWebError(
                    TronWebErrorCode.RequestAccounts,
                    "请允许TronLink钱包连接到本站（如果没有弹出连接窗口，请先点击TronLink图标，并输入密码解锁钱包）"
                  )
                );
                return;
              }
            })
            .catch((e) => {
              errHandler(e);
            });
        }
      } else {
        errHandler(
          TronWebError(TronWebErrorCode.NoTronLink, "请安装TronLink钱包")
        );
      }
    } catch (e) {
      errHandler(e);
    } finally {
      clearInterval(t);
    }
  }, 10);
};

const getConfirmedTransaction = async (
  txId,
  setLoading,
  setLoadingMsg,
  setMsg,
  setTxId
) => {
  let t;
  const inner = async () => {
    let res;

    try {
      console.log("getConfirmedTransaction: ", txId);
      res = await tronWeb.trx.getConfirmedTransaction(txId);
    } catch (e) {
      console.log(e);
    } finally {
      console.log(res);
      const ok = res?.ret[0]?.contractRet === "SUCCESS";
      if (ok) {
        setLoading(false);
        setMsg("交易成功");
        setTxId(txId);
        clearTimeout(t);
      } else {
        inner();
      }
    }
  };
  t = setTimeout(async () => {
    await inner();
  }, 3000);
};

export const sendUSDT = async (
  tronWeb,
  toAddress,
  price,
  setLoading,
  setLoadingMsg,
  setMsg,
  //   setTxId,
  callback
) => {
  if (!tronWeb) {
    throw TronWebError(TronWebErrorCode.NoConnectTronLink, "无实例");
  }
  try {
    setLoadingMsg("正在创建USDT转账交易");
    const c = await tronWeb.contract().at("TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t");
    console.log(c);

    setLoadingMsg("请在TronLink弹出窗口点击“签名”");
    let res;
    try {
      res = await c.transfer(toAddress, tronWeb.toSun(price)).send({});
      console.log(res);
      //   setTxId(res);
      await callback(res);
    } catch (e) {
      setLoading(false);
      setMsg("交易取消，请重试");
      console.log(e);
      return;
    }
    // setLoadingMsg("正在区块链上确认交易");
    // await getConfirmedTransaction(res, setLoading, setLoadingMsg);
  } catch (e) {
    throw TronWebError(TronWebErrorCode.SendFailed, e);
  }
};
