import React, { useEffect, useState } from "react";
import PageMeta from "../../../components/PageMeta";
import PageTitle from "../../../components/PageTitle";
import { geta } from "../../../fetcher/fetcher";
import code from "../../../utils/code";
import Card from "../../../components/Card";
import datelineFormat from "../../../utils/dtf";
import Link from "next/link";
import Paginate from "../../../components/Paginate";

export default function PurchasedServiceIndex({ page }) {
  const [psPaginate, setPsPaginate] = useState({ data: [] });

  useEffect(() => {
    geta(`/user/purchased-service?page=${page}&page_size=30`)
      .then((res) => {
        if (res?.code === code.OK) {
          setPsPaginate({ ...res?.data });
          return;
        }
        if (res?.code === code.Jwt) {
          return;
        }
        if (res?.code !== code.OK) {
          return;
        }
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {});
  }, []);
  return (
    <>
      <PageMeta>已购项目</PageMeta>
      <PageTitle>已购项目</PageTitle>
      {/* <div>{JSON.stringify(psPaginate)}</div> */}

      <Card className="mx-3 mb-3 lg:mx-0">
        <div className="prose max-w-none w-full overflow-x-auto">
          <table>
            <thead>
              <tr>
                <th>类型</th>
                <th>服务</th>
                <th>数量</th>
                <th>订单号</th>
                <th>状态</th>
                <th>时间</th>
              </tr>
            </thead>
            <tbody>
              {psPaginate.data.map((ps) => (
                <>
                  <tr key={ps.id}>
                    <td>
                      {ps.service_type === "Subscriber" ? "订阅" : "专题"}
                    </td>
                    <td>
                      {ps.service_type === "Subscriber" ? (
                        "成为尊贵的订阅用户(30天)"
                      ) : (
                        <Link href={`/subject/${ps?.subject_slug}`}>
                          {ps?.subject_name}
                        </Link>
                      )}
                    </td>
                    <td>{ps.server_num}</td>
                    <td>
                      <Link href={`/user/order/${ps.order_id}`}>
                        {ps.order_num}
                      </Link>
                    </td>
                    <td>{ps.status === "Finished" ? "已完成" : "待支付"}</td>
                    <td>{datelineFormat(ps.dateline)}</td>
                  </tr>
                </>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {psPaginate.total_page > 0 ? (
        <div className="my-3 text-right mx-3 lg:mx-0">
          <Paginate
            totalPage={psPaginate.total_page}
            page={psPaginate.page}
            baseUrl="/purchased_service"
          />
        </div>
      ) : (
        <div className="my-3"></div>
      )}
    </>
  );
}

export async function getServerSideProps({ query }) {
  const { page: pageStr } = query;
  const page = parseInt(pageStr) || 0;

  return { props: { page } };
}
