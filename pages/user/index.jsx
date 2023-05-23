import React, { useEffect, useState } from "react";
import PageMeta from "../../components/PageMeta";
import PageTitle from "../../components/PageTitle";
import { geta } from "../../fetcher/fetcher";
import Card from "../../components/Card";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/router";
import datelineFormat from "../../utils/dtf";
import Paginate from "../../components/Paginate";

export default function UserHome() {
  const [onlineDerives, setOnlineDerives] = useState([]);
  const [loginLogPaginate, setloginLogPaginate] = useState({ data: [] });
  const router = useRouter();
  const { page: pageStr } = router.query;

  useEffect(() => {
    const page = parseInt(pageStr, 10) || 0;
    Promise.all([
      geta("/user/online_derive"),
      geta(`/user/login_log?page=${page}&page_size=30`),
    ])
      .then(([odResult, llResult]) => {
        const odCode = odResult?.code;
        const llCode = llResult?.code;
        if (odCode === 0 && llCode === 0) {
          setOnlineDerives(odResult?.data);
          setloginLogPaginate(llResult?.data);
          return;
        }
        if (odCode === 9527 || llCode === 9527) {
          deleteCookie(process.env.NEXT_PUBLIC_TOKEN_COOKIE_NAME);
          router.push("/login?r=/user");
          return;
        }

        console.log(odResult);
        console.log(llResult);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [pageStr]);
  return (
    <>
      <PageMeta>用户中心</PageMeta>
      <PageTitle>用户中心</PageTitle>
      {/* {
	"0": {
		"id": 1,
		"email": "team@axum.rs",
		"nickname": "root",
		"status": "Actived",
		"dateline": "2023-05-22T13:08:54+08:00",
		"types": "Normal",
		"sub_exp": "2023-04-30T16:08:16+08:00",
		"points": 123,
		"allow_device_num": 3,
		"available_device_num": 3,
		"login_id": 34,
		"online_id": "a05bc357-ee7b-4a6e-b81f-6e28099b6bfb",
		"ip": "72.18.214.237",
		"uai": {
			"device": "Mac",
			"os": "Mac OS X 10",
			"browser": "Firefox 113"
		}
	}
} */}

      <Card>
        <Card.Header title="个人信息" moreText="签到"></Card.Header>
        <div className="grid grid-cols-2">
          <div>
            账户类型：
            {onlineDerives[0]?.types === "Normal" ? "普通用户" : "订阅用户"}
          </div>
          <div>
            订阅到期时间：
            {onlineDerives[0]?.types === "Normal"
              ? "-"
              : datelineFormat(onlineDerives[0]?.sub_exp)}
          </div>
          <div>
            注册时间：
            {datelineFormat(onlineDerives[0]?.dateline)}
          </div>
          <div>
            点数：
            {onlineDerives[0]?.points}
          </div>
        </div>
      </Card>

      <Card className="my-3">
        <Card.Header title="在线设备" hasMore={false} />
        <div className="prose max-w-none ">
          <table>
            <thead>
              <tr>
                <th>登录ID</th>
                <th>鉴权ID</th>
                <th>设备</th>
                <th>操作系统</th>
                <th>浏览器</th>
                <th>IP</th>
                <th>登录时间</th>
              </tr>
            </thead>
            <tbody>
              {onlineDerives.map((d) => (
                <tr key={d?.login_id} className="odd:bg-gray-50">
                  <td>{d?.login_id}</td>
                  <td>{d?.online_id}</td>
                  <td>{d?.uai?.device}</td>
                  <td>{d?.uai?.os}</td>
                  <td>{d?.uai?.browser}</td>
                  <td>{d?.ip}</td>
                  <td>{datelineFormat(d?.dateline)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Card>
        <Card.Header title="登录记录" hasMore={false} />
        <div className="prose max-w-none ">
          <table>
            <thead>
              <tr>
                <th>登录ID</th>

                <th>设备</th>
                <th>操作系统</th>
                <th>浏览器</th>
                <th>IP</th>
                <th>登录时间</th>
                <th>用户代理</th>
              </tr>
            </thead>
            <tbody>
              {loginLogPaginate?.data.map((d) => (
                <tr key={d?.id} className="odd:bg-gray-50">
                  <td>{d?.id}</td>

                  <td>{d?.device}</td>
                  <td>{d?.os}</td>
                  <td>{d?.browser}</td>
                  <td>{d?.ip}</td>
                  <td>{datelineFormat(d?.dateline)}</td>
                  <td className="text-xs">
                    <div className="w-full">{d?.user_agent}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <div className="my-3 text-right">
        <Paginate
          page={loginLogPaginate.page}
          totalPage={loginLogPaginate.total_page}
          baseUrl="/user"
        />
      </div>
    </>
  );
}
