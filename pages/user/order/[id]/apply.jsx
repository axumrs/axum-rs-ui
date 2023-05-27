import React, { useEffect, useState } from "react";
import PageMeta from "../../../../components/PageMeta";
import PageTitle from "../../../../components/PageTitle";
import Card from "../../../../components/Card";
import Form from "../../../../components/Form";
import Link from "next/link";
import { geta, posta } from "../../../../fetcher/fetcher";
import { useRouter } from "next/router";
import { getToken } from "../../../../utils/cookie";
import Toast from "../../../../components/Toast";
import datelineFormat from "../../../../utils/dtf";
import usdt2rmb from "../../../../utils/usdt2rmb";

const defaultInputData = {
  currency: "CNY",
  types: "Alipay",
  price: 0,
  tx_id: "",
  img: "",
};

const payApplyStatusDict = {
  Pending: {
    text: "待审核",

    css: "px-3 py-1 text-white bg-gray-600  rounded ",
  },
  Reject: {
    text: "已拒绝",
    css: "px-3 py-1 text-white bg-red-600  rounded",
  },
  Finished: {
    text: "已通过",
    css: "px-3 py-1 text-white bg-green-600  rounded",
  },
};

export default function OrderPayApply() {
  const [order, setOrder] = useState({});

  const [input, setInput] = useState({ ...defaultInputData });

  const [toastMsg, setToastMsg] = useState("");
  const [toastType, setToastType] = useState("default");

  const [isSubmiting, setSubmiting] = useState(false);

  const [hasPayApply, setHasPayApply] = useState(false);
  const [reload, setReload] = useState(false);

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    Promise.all([
      geta(`/user/order/${id}`, getToken()),
      geta(`/user/pay-apply/${id}`, getToken()),
    ])
      .then(([orderRes, payApplyRes]) => {
        if (orderRes?.code === 9527 || payApplyRes?.code === 9527) {
          router.push(`/login?r=/user/order/${id}/apply`);
          return;
        }
        if (orderRes?.code !== 0) {
          setToastMsg("获取失败，请检查你的网络");
          setToastType("error");
          return;
        }

        if (orderRes?.code === 0) {
          const { data } = orderRes;
          console.log(data);
          setOrder({ ...data });

          if (payApplyRes?.code === 0) {
            const { data: paData } = payApplyRes;
            setInput({ ...paData });
            setHasPayApply(true);
          } else if (payApplyRes?.code === 9529) {
            setInput({ ...defaultInputData });
            setHasPayApply(false);
          } else {
            setToastMsg("获取失败，请检查你的网络");
            setToastType("error");
          }
          return;
        }
      })
      .catch((e) => {
        setToastMsg("获取失败，请检查你的网络");
        setToastType("error");
        console.log(e);
      })
      .finally(() => {});
  }, [reload]);

  useEffect(() => {
    let price = order?.price || 0;
    price = input.types == "Alipay" ? usdt2rmb(price, 100) : price / 100;
    setInput({ ...input, price });
  }, [order]);

  const onChangeHandler = (key) => {
    return (e) => {
      let v = e.target.value;
      if (key === "price") {
        v = parseInt(v, 10) || 0;
      }
      if (key === "types") {
        const currency = v === "Alipay" ? "CNY" : "USDT";
        const price =
          v === "Alipay" ? usdt2rmb(order?.price, 100) : order?.price / 100;
        setInput({ ...input, currency, types: v, price });
        return;
      }
      setInput({ ...input, [key]: v });
    };
  };

  const submitHandler = async () => {
    const price = input.price * 100;
    const postData = { ...input, order_id: parseInt(id, 10), price };
    try {
      setSubmiting(true);
      const res = await posta("/user/pay-apply", { ...postData });
      if (res?.code === 0) {
        setToastMsg("提交成功");
        setToastType("success");
        setReload(true);
        return;
      }
      if (res?.code === 9527) {
        router.push(`/login?r=/user/order/${id}/apply`);
        return;
      }
      if (res?.code === 9528) {
        setToastMsg("表单输入有误，请检查你的输入");
        setToastType("error");
        return;
      }
      if (res?.code !== 0) {
        setToastMsg("提交失败，请检查你的网络");
        return;
      }
    } catch (e) {
      console.log(e);
      setToastMsg("提交失败，请检查你的网络");
    } finally {
      setSubmiting(false);
    }
  };
  return (
    <>
      <PageMeta>支付证明</PageMeta>
      <PageTitle>支付证明</PageTitle>
      {toastMsg && (
        <Toast type={toastType} callback={() => setToastMsg("")}>
          {toastMsg}
        </Toast>
      )}

      {/* <div>{JSON.stringify(input)}</div> */}

      <div className="mx-3 p-2 border border-l-4 inline-block bg-gray-100 border-l-cyan-600 rounded-tl rounded-bl lg:mx-0">
        如果你已经通过手动转账，请在此提交支付证明，经过我们的确认后，你的订单将会完成。
      </div>

      <Card className="mx-3 my-3 text-xs lg:text-base lg:mx-0">
        <Card.Header hasMore={false} title="订单摘要" />
        <div className="grid grid-cols-1 gap-3">
          <div className="grid grid-cols-2 gap-3">
            <div className="w-full truncate">订单编号：{order?.order_num}</div>
            <div className="w-full truncate">
              下单时间：{datelineFormat(order?.dateline)}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>识别码：{order?.code}</div>
            <div className="flex justify-start items-start">
              <div>应付金额：</div>
              <div>
                {order?.price / 100} USDT <br className="lg:hidden" />(
                {usdt2rmb(order?.price, 100)}
                人民币)
              </div>
            </div>
          </div>
        </div>
      </Card>

      {!hasPayApply ? (
        <Card className="mx-3 mb-3 lg:mx-0">
          <Card.Header hasMore={false} title="支付证明" />
          <div className="relative p-3">
            <Form
              className="grid grid-cols-1 gap-6"
              isLoading={isSubmiting}
              onSubmit={submitHandler}
            >
              <label className="block">
                <span className="text-gray-700 before:text-red-600 before:content-['*'] before:mr-1 before:text-sm">
                  支付方式
                </span>
                <select
                  className="
                form-select
                    block
                    w-full
                    mt-0
                    px-0.5
                    border-0 border-b-2 border-gray-200
                    focus:ring-0 focus:border-black
                  "
                  required
                  onChange={onChangeHandler("types")}
                  value={input.types}
                >
                  <option value="Alipay">支付宝转账</option>
                  <option value="USDT">USDT转账</option>
                </select>
              </label>

              <label className="block">
                <span className="text-gray-700 before:text-red-600 before:content-['*'] before:mr-1 before:text-sm">
                  交易号
                </span>
                <input
                  type="text"
                  className="
                    form-input
                    mt-0
                    block
                    w-full
                    px-0.5
                    border-0 border-b-2 border-gray-200
                    focus:ring-0 focus:border-black
                  "
                  placeholder="输入支付宝或USDT区块链的交易号"
                  required
                  onChange={onChangeHandler("tx_id")}
                  value={input.tx_id}
                />
              </label>

              <label className="block">
                <span className="text-gray-700 before:text-red-600 before:content-['*'] before:mr-1 before:text-sm">
                  转账金额
                </span>
                <div className="flex justify-start items-end space-x-1">
                  <input
                    type="number"
                    className="
                    form-input
                    mt-0
                    block
                    w-full
                    px-0.5
                    border-0 border-b-2 border-gray-200
                    focus:ring-0 focus:border-black
                  "
                    placeholder="输入转账金额"
                    required
                    onChange={onChangeHandler("price")}
                    value={input.price}
                  />
                  <span className="shrink-0">
                    {input.currency === "CNY" ? "人民币" : "USDT"}
                  </span>
                </div>
              </label>

              <label className="block">
                <span className="text-gray-700 before:text-red-600 before:content-['*'] before:mr-1 before:text-sm">
                  凭证截图
                </span>
                <input
                  type="url"
                  className="
                    form-input
                    mt-0
                    block
                    w-full
                    px-0.5
                    border-0 border-b-2 border-gray-200
                    focus:ring-0 focus:border-black
                  "
                  placeholder="请输入交易凭证截图的网址"
                  required
                  onChange={onChangeHandler("img")}
                  value={input.img}
                />
              </label>

              <div
                className="mt-0
                    w-full
                    px-0.5
                    flex justify-center items-start space-x-3"
              >
                <button
                  type="submit"
                  className="bg-blue-500 px-6 py-2 border  rounded text-white border-blue-600 hover:bg-blue-600 inline-block"
                >
                  提交
                </button>
                <Link
                  href="/user/order"
                  className="bg-white px-6 py-2 border  rounded text-gray-600 border-gray-400 hover:bg-gray-100 inline-block"
                >
                  取消
                </Link>
              </div>
            </Form>
          </div>
        </Card>
      ) : (
        <Card className="mx-3 mb-3 lg:mx-0">
          <Card.Header hasMore={false} title="支付证明详情" />
          <div className="flex flex-col divide-y">
            <div className="grid grid-cols-2 py-3 lg:py-6 px-1 lg:px-3 odd:bg-gray-50 first:border-t">
              <div className="after:content-['：']">支付方式</div>
              <div>{input.types}</div>
            </div>
            <div className="grid grid-cols-2 py-3 lg:py-6 px-1 lg:px-3 odd:bg-gray-50 first:border-t">
              <div className="after:content-['：']">交易号</div>
              <div>{input.tx_id}</div>
            </div>
            <div className="grid grid-cols-2 py-3 lg:py-6 px-1 lg:px-3 odd:bg-gray-50 first:border-t">
              <div className="after:content-['：']">转账金额</div>
              <div>
                {input.price} {input.currency}
              </div>
            </div>
            <div className="grid grid-cols-2 py-3 lg:py-6 px-1 lg:px-3 odd:bg-gray-50 first:border-t">
              <div className="after:content-['：']">凭证截图</div>
              <div>
                <a href={input.img} target="_blank">
                  <img
                    src={input.img}
                    alt="凭证截图"
                    className="w-48 object-cover border rounded"
                  />
                </a>
              </div>
            </div>
            <div className="grid grid-cols-2 py-3 lg:py-6 px-1 lg:px-3 odd:bg-gray-50 first:border-t">
              <div className="after:content-['：']">提交时间</div>
              <div>{datelineFormat(input?.dateline)}</div>
            </div>
            <div className="grid grid-cols-2 py-3 lg:py-6 px-1 lg:px-3 odd:bg-gray-50 first:border-t">
              <div className="after:content-['：']">审核状态</div>
              <div>
                <span className={payApplyStatusDict[input?.status].css}>
                  {payApplyStatusDict[input?.status].text}
                </span>
              </div>
            </div>
            {input?.status !== "Pending" && (
              <>
                <div className="grid grid-cols-2 py-3 lg:py-6 px-1 lg:px-3 odd:bg-gray-50 first:border-t">
                  <div className="after:content-['：']">审核时间</div>
                  <div>{datelineFormat(input?.process_dateline)}</div>
                </div>
                <div className="grid grid-cols-2 py-3 lg:py-6 px-1 lg:px-3 odd:bg-gray-50 first:border-t">
                  <div className="after:content-['：']">审核理由</div>
                  <div>{input?.reason}</div>
                </div>
              </>
            )}
          </div>
          <div className="flex justify-end items-center my-3 py-3">
            <button
              type="button"
              className="bg-white px-6 py-2 border  rounded text-gray-600 border-gray-400 hover:bg-gray-100 inline-block"
              onClick={() => {
                router.back();
              }}
            >
              返回
            </button>
          </div>
        </Card>
      )}
    </>
  );
}
