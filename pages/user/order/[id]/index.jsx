import React, { useEffect, useState } from "react";
import Card from "../../../../components/Card";
import Link from "next/link";
import { geta, posta } from "../../../../fetcher/fetcher";
import { useRouter } from "next/router";
import { getToken } from "../../../../utils/cookie";
import Toast from "../../../../components/Toast";
import usdt2rmb from "../../../../utils/usdt2rmb";
import PageMeta from "../../../../components/PageMeta";
import PageTitle from "../../../../components/PageTitle";
import { getTronWeb, sendUSDT } from "../../../../utils/tronlink";
import MsgBox from "../../../../components/MsgBox";
import Loading from "../../../../components/Loading";
import datelineFormat from "../../../../utils/dtf";
import code from "../../../../utils/code";

const payTypesDict = {
  TronLink: "TronLink钱包",
  USDT: "USDT转账",
  Alipay: "支付宝转账",
};

export default function OrderDetail() {
  const [order, setOrder] = useState({});
  const [orderSnap, setOrderSnap] = useState([]);
  const [toastMsg, setToastMsg] = useState("");
  const [txId, setTxId] = useState("");
  const [payInfo, setPayInfo] = useState({});
  const router = useRouter();

  const { id } = router.query;

  useEffect(() => {
    geta(`/user/order/${id}`, getToken())
      .then((res) => {
        if (res?.code === code.OK) {
          const { data } = res;
          console.log(data);
          const snap = data?.snap || "[]";
          setOrder({ ...data });
          setOrderSnap(JSON.parse(snap));
          return;
        }
        if (res?.code === code.Jwt) {
          router.push(`/login?r=/user/order/${id}`);
          return;
        }
        if (res?.code !== code.OK) {
          setToastMsg("获取失败，请检查你的网络");
          return;
        }
      })
      .catch((e) => {
        setToastMsg("获取失败，请检查你的网络");
        console.log(e);
      })
      .finally(() => {});
  }, [txId]);

  useEffect(() => {
    if (!(order && order.status && order.status === "Finished")) {
      return;
    }
    geta(`/user/pay/${order.pay_id}`, getToken())
      .then((res) => {
        if (res?.code === 0) {
          const { data } = res;
          console.log(data);
          setPayInfo(data);
          return;
        }
        if (res?.code === 9527) {
          router.push(`/login?r=/user/order/${id}`);
          return;
        }
        if (res?.code !== 0) {
          setToastMsg("获取失败，请检查你的网络");
          return;
        }
      })
      .catch((e) => {
        setToastMsg("获取失败，请检查你的网络");
        console.log(e);
      })
      .finally(() => {});
  }, [order]);
  return (
    <>
      <PageMeta>订单详情</PageMeta>
      <PageTitle>订单详情</PageTitle>
      {toastMsg && (
        <Toast.Error
          callback={() => {
            setToastMsg("");
          }}
        >
          {toastMsg}
        </Toast.Error>
      )}
      <Card className="mx-3 lg:mx-0">
        <Card.Header hasMore={false} title="订单摘要" />
        <div className="grid grid-cols-2">
          <div>订单编号：{order?.order_num}</div>
          <div>订单金额：$ {order?.price / 100}</div>
        </div>
        <div className="grid grid-cols-2">
          <div>
            订单识别码（非常重要）：
            <span className="font-mono bg-cyan-600 text-white px-2 py-1">
              {order?.code}
            </span>
          </div>
          <div>
            订单状态：
            {order?.status === "Finished" ? (
              <span className="text-green-600">已完成</span>
            ) : (
              <span className="text-rose-600">待支付</span>
            )}
          </div>
        </div>
      </Card>

      <Card className="mx-3 lg:mx-0 my-3">
        <Card.Header hasMore={false} title="支付方式" />
        {order?.status === "Finished" ? (
          <>
            <div className="flex flex-col divide-y">
              <div className="grid grid-cols-2 py-3 lg:py-6 px-1 lg:px-3 odd:bg-gray-50 first:border-t">
                <div className="after:content-['：']">支付方式</div>
                <div>{payTypesDict[payInfo?.types]}</div>
              </div>
              <div className="grid grid-cols-2 py-3 lg:py-6 px-1 lg:px-3 odd:bg-gray-50 first:border-t">
                <div className="after:content-['：']">交易号</div>
                <div>
                  {payInfo.currency === "USDT" ? (
                    <a
                      href={`https://tronscan.org/#/transaction/${payInfo?.tx_id}`}
                      target="_blank"
                      className="underline decoration-dashed"
                    >
                      {payInfo?.tx_id}
                    </a>
                  ) : (
                    payInfo?.tx_id
                  )}
                </div>
              </div>
              <div className="grid grid-cols-2 py-3 lg:py-6 px-1 lg:px-3 odd:bg-gray-50 first:border-t">
                <div className="after:content-['：']">转账金额</div>
                <div>
                  {payInfo?.types === "TronLink"
                    ? payInfo?.price / 100 / 100000
                    : payInfo?.price / 100}{" "}
                  {payInfo?.currency}
                </div>
              </div>

              <div className="grid grid-cols-2 py-3 lg:py-6 px-1 lg:px-3 odd:bg-gray-50 first:border-t">
                <div className="after:content-['：']">支付时间</div>
                <div>{datelineFormat(payInfo?.dateline)}</div>
              </div>
            </div>
          </>
        ) : (
          <PayMethod {...{ order, setToastMsg, txId, setTxId }} />
        )}
      </Card>

      <Card className="mx-3 mb-3 lg:mx-0">
        <Card.Header hasMore={false} title="本次购买的服务" />
        <div className="prose max-w-none w-full overflow-x-auto">
          <table>
            <thead>
              <tr>
                <th>类型</th>
                <th>服务</th>
                <th>金额</th>
              </tr>
            </thead>
            <tbody>
              {orderSnap.map((s) => (
                <tr key={s.idx}>
                  <td>{s.type}</td>
                  <td>{s.service}</td>
                  <td>
                    $ {s.price} x {s.number} = $ {s.price * s.number}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </>
  );
}

function PayMethod({ order, setToastMsg, txId, setTxId }) {
  const [activedIndex, setActivedIndex] = useState(0);
  const [tronWeb, setTronWeb] = useState();
  const [fromAddress, setFromAddress] = useState("");
  const [msg, setMsg] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [isLoadingMsg, setLoadingMsg] = useState("");

  const toAddr = process.env.NEXT_PUBLIC_TRC_ADDR;
  const css = "bg-gray-50 px-3 py-1";
  const activedCss = "bg-white px-3 py-2 font-semibold";

  useEffect(() => {
    if (window.tronLink) {
      window.addEventListener("message", function (e) {
        // 连接
        if (e.data.message && e.data.message.action == "connect") {
          console.log("连接");
          setFromAddress(tronWeb?.defaultAddress?.base58);
        }

        if (e.data.message && e.data.message.action == "disconnect") {
          console.log("断开连接");
          setFromAddress("");
          setTronWeb(undefined);
        }
      });
    }
  }, [tronWeb]);

  useEffect(() => {
    connect2tronLink();
  }, []);

  useEffect(() => {
    if (tronWeb) {
      setFromAddress(tronWeb.defaultAddress.base58);
    }
  }, [tronWeb]);

  function errHandler(e) {
    setMsg(e?.message || "发生错误");
    console.log(e);
  }

  const sendUsdtHandler = async (price) => {
    setLoading(true);
    setLoadingMsg("等待支付");
    try {
      // tryGetTronWeb(setTronWeb, errHandler);
      await sendUSDT(
        tronWeb,
        toAddr,
        price / 100,
        setLoading,
        setLoadingMsg,
        setMsg,
        // setTxId,
        async (txId) => {
          try {
            setLoadingMsg("正在更新订单状态");
            console.log("id:", order.id, "txId:", txId);
            const res = await posta(
              `/user/order/pay`,
              {
                order_id: order.id,
                price: order.price,
                currency: "USDT",
                types: "TronLink",
                tx_id: txId,
                status: "Finished",
              },
              getToken()
            );
            if (res?.code === 0) {
              setMsg(
                "恭喜，支付成功。如果你购买了订阅服务，需要重新登录才能生效。"
              );
              setTxId(txId);
              return;
            }
            if (res?.code === 9527) {
              router.push(`/login?r=/user/order/${id}`);
              return;
            }
            if (res?.code !== 0) {
              setMsg("获取失败，请检查你的网络");
              return;
            }
          } catch (e) {
            setMsg("获取失败，请检查你的网络");
            console.log(e);
          } finally {
            setLoading(false);
          }
        }
      );
    } catch (e) {
      errHandler(e);
    } finally {
      // setLoading(false);
    }

    console.log("sendusdt", tronWeb);
  };

  function connect2tronLink() {
    try {
      tryGetTronWeb(setTronWeb, errHandler);
    } catch (e) {
      errHandler(e);
    }
  }

  return (
    <>
      {msg && (
        <MsgBox
          hasCancelButton={false}
          okHandler={() => {
            setMsg("");
          }}
        >
          {msg}
        </MsgBox>
      )}
      {/* <div>交易ID: {txId}</div> */}
      <ul className="flex justify-start items-end cursor-pointer space-x-1">
        <li
          className={`border ${activedIndex === 0 ? activedCss : css}`}
          onClick={() => setActivedIndex(0)}
        >
          TronLink钱包
        </li>
        <li
          className={`border ${activedIndex === 1 ? activedCss : css}`}
          onClick={() => setActivedIndex(1)}
        >
          USDT手动转账
        </li>
        <li
          className={`border ${activedIndex === 2 ? activedCss : css}`}
          onClick={() => setActivedIndex(2)}
        >
          支付宝扫码
        </li>
      </ul>

      <div className={`${activedIndex === 0 ? "block" : "hidden"}`}>
        <div className="relative">
          {isLoading && <Loading>{isLoadingMsg}</Loading>}
          {tronWeb && fromAddress ? (
            <>
              <div className="mt-3">
                {fromAddress ? (
                  <>
                    你的钱包地址：
                    <span className="font-mono">{fromAddress}</span>
                  </>
                ) : (
                  <>当前未连接钱包</>
                )}
              </div>
              <div className="my-3">
                <button
                  type="button"
                  className="border px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white border-blue-700"
                  onClick={() => {
                    sendUsdtHandler(order.price);
                  }}
                >
                  使用 TronLink 在线支付
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="my-3">
                <button
                  type="button"
                  className="border px-3 py-1 bg-teal-500 hover:bg-teal-600 text-white border-teal-600 "
                  onClick={connect2tronLink}
                >
                  连接 TronLink 钱包
                </button>
              </div>
            </>
          )}

          <ul className="list-decimal translate-x-4">
            <li>该支付方式快速到账，并自动确认订单</li>
            <li>
              为了快速处理潜在的争议，请在钱包的备注栏填写本次交易的识别码
            </li>
            <li>
              你需要先安装
              <a
                href="https://www.tronlink.org/cn/dlDetails/"
                target="_blank"
                className="underline decoration-dashed"
              >
                TronLink
              </a>
              钱包
            </li>
            <li>点击支付按钮后，会调用 TronLink 钱包的浏览器扩展版</li>
          </ul>
        </div>
      </div>
      <div className={`${activedIndex === 1 ? "block" : "hidden"}`}>
        <div className="mt-3 border-l-4 inline-block px-3 py-1  bg-gray-100">
          支付金额{" "}
          <span className="text-emerald-600 font-normal">
            $ {order?.price / 100} USDT
          </span>
        </div>
        <div className="my-3">
          <div>
            收款地址：
            <span className="font-mono px-2 py-1 bg-gray-100">{toAddr}</span>
          </div>
          <div className="p-1 my-3">
            <img
              src={process.env.NEXT_PUBLIC_TRC_QRCODE}
              className="w-48 object-cover border rounded lg:w-64"
              alt={toAddr}
            />
          </div>
        </div>
        <ul className="list-decimal translate-x-4">
          <li>该支付方式需要管理员手动确认订单</li>
          <li>
            为了快速确认订单及处理潜在的争议，请在钱包的备注栏填写本次交易的识别码：
            <span className="font-mono bg-cyan-600 text-white px-2 py-1">
              {order?.code}
            </span>
          </li>
          <li>请再三核对收款地址是我们的钱包地址</li>
          <li>我们只接受 USDT (TRC 20)，请不要转账其它代币</li>
          <li>
            请选择支持 USDT (TRC 20) 的钱包，收款地址转账。你可以试试
            <a
              href="https://www.tronlink.org/cn/dlDetails/"
              target="_blank"
              className="underline decoration-dashed"
            >
              TronLink
            </a>
            钱包
          </li>
          <li>
            通常会在转账完成后24小时内确认订单，如果长时间未进行处理，请
            <Link href="/about" className="underline decoration-dashed">
              请联系站长
            </Link>
          </li>
        </ul>
      </div>
      <div className={`${activedIndex === 2 ? "block" : "hidden"}`}>
        <div className="mt-3 border-l-4 inline-block px-3 py-1  bg-gray-100">
          支付金额{" "}
          <span className="text-amber-600 font-normal">
            ¥ {usdt2rmb(order?.price, 100)} 人民币
          </span>
        </div>
        <div className="my-3 p-1">
          <img
            src={process.env.NEXT_PUBLIC_ALIPAY_QRCODE}
            className="w-48 object-cover border rounded lg:w-64"
            alt="支付宝"
          />
        </div>

        <ul className="list-decimal translate-x-4">
          <li>该支付方式需要管理员手动确认订单</li>
          <li>
            为了快速确认订单及处理潜在的争议，请在钱包的备注栏填写本次交易的识别码：
            <span className="font-mono bg-cyan-600 text-white px-2 py-1">
              {order?.code}
            </span>
          </li>
          <li>我们会将金额转换成人民币，你需要支付这个人民币金额</li>
          <li>
            通常会在转账完成后24小时内确认订单，如果长时间未进行处理，请
            <Link href="/about" className="underline decoration-dashed">
              联系站长
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}

function tryGetTronWeb(setter, errHandler) {
  getTronWeb(setter, errHandler);
}
