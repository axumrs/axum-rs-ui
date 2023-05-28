import React, { useEffect, useState } from "react";
import PageMeta from "../../../components/PageMeta";
import PageTitle from "../../../components/PageTitle";
import Card from "../../../components/Card";
import { useRouter } from "next/router";
import { geta } from "../../../fetcher/fetcher";
import { getToken } from "../../../utils/cookie";
import Paginate from "../../../components/Paginate";
import Link from "next/link";
import usdt2rmb from "../../../utils/usdt2rmb";
import datetimeFormat from "../../../utils/dtf";
import code from "../../../utils/code";

export default function OrderIndex({ page }) {
  const [orderPaginate, setOrderPaginate] = useState({
    data: [],
    page,
    total_page: 0,
  });
  const [toastMsg, setToastMsg] = useState("");
  const router = useRouter();

  useEffect(() => {
    geta(`/user/order?page_size=30&page=${page}`, getToken())
      .then((res) => {
        if (res?.code === code.OK) {
          const { data } = res;
          console.log(data);
          setOrderPaginate({ ...data });
          return;
        }
        if (res?.code === code.Jwt) {
          router.push(`/login?r=/user/order`);
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
  }, []);
  return (
    <>
      <PageMeta>订单列表</PageMeta>
      <PageTitle>订单列表</PageTitle>

      <Card className="mx-3 lg:mx-0">
        <div className="prose max-w-none w-full overflow-x-auto">
          <table className="text-xs lg:text-base">
            <thead>
              <tr>
                <th className="w-1/6">订单编号</th>
                <th className="w-1/6">订单金额</th>
                <th className="w-1/6">订单识别码</th>
                <th className="w-1/6">订单状态</th>
                <th className="w-1/6">订单时间</th>
                <th className="w-1/6">操作</th>
              </tr>
            </thead>
            <tbody>
              {orderPaginate?.data && orderPaginate?.data.length ? (
                orderPaginate?.data.map((o) => (
                  <tr key={o.id}>
                    <td className="w-1/6 truncate">{o.order_num}</td>
                    <td className="w-1/6 truncate">
                      $ {o.price / 100} (¥{usdt2rmb(o.price, 100)})
                    </td>
                    <td className="w-1/6 truncate">{o.code}</td>
                    <td className="w-1/6 truncate">
                      {o.status === "Finished" ? (
                        <span className="text-green-600">已完成</span>
                      ) : (
                        <span className="text-rose-600">待支付</span>
                      )}
                    </td>
                    <td className="w-1/6 truncate">
                      {datetimeFormat(o.dateline)}
                    </td>
                    <td className="w-1/6 truncate">
                      <Link
                        href={`/user/order/${o.id}`}
                        className="border no-underline px-3 py-1 bg-blue-500 font-light text-white hover:bg-blue-600"
                      >
                        {o.status === "Finished" ? "订单详情" : "支付"}
                      </Link>
                      {o.status !== "Finished" && (
                        <Link
                          href={`/user/order/${o.id}/apply`}
                          className="border no-underline px-3 py-1 bg-cyan-500 font-light text-white hover:bg-cyan-600"
                        >
                          支付证明
                        </Link>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6}>没有记录</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
      {orderPaginate.total_page > 0 && (
        <div className="my-3 text-right mx-3 lg:mx-0">
          <Paginate
            page={orderPaginate.page}
            totalPage={orderPaginate.total_page}
            baseUrl="/user/order"
          />
        </div>
      )}
    </>
  );
}

export async function getServerSideProps({ query }) {
  const { page: pageStr } = query;
  const page = parseInt(pageStr, 10) || 0;

  return { props: { page } };
}
