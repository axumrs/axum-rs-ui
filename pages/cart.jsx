import React, { useState } from "react";
import PageMeta from "../components/PageMeta";
import PageTitle from "../components/PageTitle";
import Card from "../components/Card";
import { useCartContext } from "../contexts/CartContext";
import { TrashIcon } from "@heroicons/react/24/outline";
import { getToken } from "../utils/cookie";
import { useRouter } from "next/router";
import Loading from "../components/Loading";
import { posta } from "../fetcher/fetcher";
import Toast from "../components/Toast";

export default function Cart() {
  const [isLoading, setLoading] = useState(false);
  const [toastMsg, setToastMsg] = useState("");

  const { items, removeItem, updateItem, clearItems, hasItems, amount } =
    useCartContext();
  const token = getToken();
  const router = useRouter();

  const createOrderHandler = () => {
    if (!hasItems()) {
      window.alert("购物车为空");
      return;
    }
    if (!token) {
      router.push("/login?r=/cart");
      return;
    }
    setLoading(true);
    posta(
      "/user/order",
      { snap: JSON.stringify(items), price: amount() },
      getToken()
    )
      .then((data) => {
        if (data?.code === 0) {
          const {
            data: { id },
          } = data;
          clearItems();
          router.push(`/user/order/${id}`);
          return;
        }
        if (data?.code === 9527) {
          router.push("/login?r=/cart");
          return;
        }
        if (data?.code !== 0) {
          setToastMsg("提交失败，请检查你的网络");
          return;
        }
      })
      .catch((e) => {
        setToastMsg("提交失败，请检查你的网络");
        console.log(e);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <>
      <PageMeta>购物车</PageMeta>
      <PageTitle>购物车</PageTitle>

      <Toast.Error isShow={toastMsg && toastMsg.length} msg={toastMsg} />

      <div className="relative">
        {isLoading && <Loading>正在创建订单</Loading>}

        <Card className="mx-3 mb-3 lg:mx-0 flex flex-col divide-y">
          {hasItems() ? (
            <>
              <ul className="flex flex-col items-start justify-start space-x-1 divide-y w-full">
                <CartItem
                  item={{
                    type: "类型",
                    service: "服务",
                    isPlain: true,
                    plainText: "价格",
                  }}
                />

                {items
                  .sort((a, b) => a.idx - b.idx)
                  .map((item) => (
                    <CartItem
                      key={item.id}
                      item={item}
                      delHandler={(item) => () => {
                        if (window.confirm("确定删除？")) {
                          removeItem(item);
                        }
                      }}
                      updateHandler={(item) => () => {
                        updateItem(item);
                        // window.alert("a");
                      }}
                    />
                  ))}
              </ul>
              <div className="py-3 flex justify-end items-center space-x-1 lg:skew-x-2">
                <span className="before:content-['$'] before:mr-1">
                  {amount()}
                </span>
                <button
                  onClick={() => {
                    if (window.confirm("确定清空？")) {
                      clearItems();
                    }
                  }}
                  className="border rounded px-3 py-1 text-sm hover:bg-gray-50 hover:border-gray-300 lg:text-base"
                >
                  清空
                </button>
                <button
                  onClick={createOrderHandler}
                  className="border rounded px-3 py-1 text-sm bg-blue-500 hover:bg-blue-600 text-white lg:text-base"
                >
                  结算
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="h-32 flex flex-col justify-center items-center">
                <div>购物车为空</div>
              </div>
            </>
          )}
        </Card>
      </div>
    </>
  );
}

function CartItem({ item, delHandler = (i) => {}, updateHandler = (i) => {} }) {
  const { type, service, serviceID, price, number, isPlain, plainText } = item;
  return (
    <li className="w-full p-1 text-sm odd:bg-gray-50 lg:text-base lg:p-3">
      <div className="grid grid-cols-12">
        <div className="col-span-2">{type}</div>
        <div className="col-span-5">{service}</div>
        <div className="col-span-4">
          <CartItemPriceCell
            {...{ item, updateHandler: updateHandler(item) }}
          />
        </div>
        <div className="col-span-1">
          {isPlain ? (
            <></>
          ) : (
            <button onClick={delHandler(item)} className="text-red-500">
              <TrashIcon className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </li>
  );
}

function CartItemPriceCell({ item, updateHandler = () => {} }) {
  const { price, number, isPlain, plainText } = item;
  if (isPlain) {
    return plainText;
  }
  const [num, setNum] = useState(number);
  return (
    <>
      <div>
        <div className="flex justify-start items-center space-x-1">
          <div className="before:content-['$'] after:content-['x'] before:mr-1 after:mx-1 ">
            {price}
          </div>

          <div>
            {/* <input
              type="number"
              value={num}
              onChange={(e) => {
                const vs = e.target.value;
                const v = parseInt(vs, 10) || 1;
                setNum(v);
                updateHandler({ ...item, number: num });
              }}
              className="outline-none border w-12  focus:ring-1 lg:w-16"
            /> */}
            {num}
          </div>
        </div>
        <div className="before:content-['金额：$']  before:mr-1  ">
          {price * num}
        </div>
      </div>
    </>
  );
}
