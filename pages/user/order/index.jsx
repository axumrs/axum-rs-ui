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
        if (res?.code === 0) {
          const { data } = res;
          console.log(data);
          setOrderPaginate({ ...data });
          return;
        }
        if (res?.code === 9527) {
          router.push(`/login?r=/user/order`);
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
  }, []);
  return (
    <>
      <PageMeta>订单列表</PageMeta>
      <PageTitle>订单列表</PageTitle>

      <Card>
        <div className="prose max-w-none w-full overflow-x-auto">
          <table>
            <thead>
              <tr>
                <th>订单编号</th>
                <th>订单金额</th>
                <th>订单识别码</th>
                <th>订单状态</th>
                <th>订单时间</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              {orderPaginate?.data.map((o) => (
                <tr key={o.id}>
                  <td>{o.order_num}</td>
                  <td>
                    $ {o.price / 100} (¥{usdt2rmb(o.price, 100)})
                  </td>
                  <td>{o.code}</td>
                  <td>
                    {o.status === "Finished" ? (
                      <span className="text-green-600">已完成</span>
                    ) : (
                      <span className="text-rose-600">待支付</span>
                    )}
                  </td>
                  <td>{datetimeFormat(o.dateline)}</td>
                  <td>
                    <Link
                      href={`/user/order/${o.id}`}
                      className="border no-underline px-3 py-1 bg-blue-500 font-light text-white hover:bg-blue-600"
                    >
                      {o.status === "Finished" ? "详情" : "支付"}
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <div className="my-3 text-right mx-3 lg:mx-0">
        <Paginate
          page={orderPaginate.page}
          totalPage={orderPaginate.total_page}
          baseUrl="/user/order"
        />
      </div>
    </>
  );
}

export async function getServerSideProps({ query }) {
  const { page: pageStr } = query;
  const page = parseInt(pageStr, 10) || 0;

  return { props: { page } };
}
