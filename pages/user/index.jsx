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
  const [info, setInfo] = useState({});
  const router = useRouter();
  const { page: pageStr } = router.query;

  useEffect(() => {
    const page = parseInt(pageStr, 10) || 0;
    Promise.all([
      geta("/user/online_derive"),
      geta(`/user/login_log?page=${page}&page_size=30`),
      geta(`/user/info`),
    ])
      .then(([odResult, llResult, infoResult]) => {
        const odCode = odResult?.code;
        const llCode = llResult?.code;
        const infoCode = infoResult?.code;
        if (odCode === 0 && llCode === 0 && infoCode === 0) {
          setOnlineDerives(odResult?.data);
          setloginLogPaginate(llResult?.data);
          setInfo(infoResult?.data);
          return;
        }
        if (odCode === 9527 || llCode === 9527 || infoCode === 9527) {
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
  const checkInHandler = async () => {
    const res = await geta("/user/check-in");
    if (res?.code === 0) {
      setInfo(res?.data);
      return;
    }
    if (res?.code === 9527) {
      router.push("/login?r=/user");
      return;
    }
    console.log(res);
    if (res?.code !== 0) {
      window.alert(res.msg);
    }
  };
  return (
    <>
      <PageMeta>用户中心</PageMeta>
      <PageTitle>用户中心</PageTitle>

      <Card className="mx-3 lg:mx-0">
        <Card.Header
          title="个人信息"
          moreText="签到"
          isBtn={true}
          onClick={checkInHandler}
        ></Card.Header>
        <div className="grid grid-cols-2 text-xs lg:text-base">
          <div>
            账户类型：
            {info?.types === "Normal" ? (
              <span className="border p-1 text-xs">普通用户</span>
            ) : (
              <span className="border p-1 text-xs bg-amber-600 text-white border-amber-600">
                订阅用户
              </span>
            )}
          </div>
          <div>
            订阅到期时间：
            {info?.types === "Normal" ? (
              "-"
            ) : (
              <>
                <span>
                  {datelineFormat(info?.sub_exp, {
                    dateOnly: true,
                  })}
                </span>
                <span className="hidden lg:inline lg:ml-1">
                  {datelineFormat(info?.sub_exp, {
                    timeOnly: true,
                  })}
                </span>
              </>
            )}
          </div>
          <div>
            注册时间：
            <span>{datelineFormat(info?.dateline, { dateOnly: true })}</span>
            <span className="hidden lg:inline lg:ml-1">
              {datelineFormat(info?.dateline, { timeOnly: true })}
            </span>
          </div>
          <div>
            点数：
            {info?.points}
          </div>
        </div>
      </Card>

      <Card className="my-3 mx-3 lg:mx-0">
        <Card.Header title="在线设备" hasMore={false} />
        <div className="prose max-w-none w-full overflow-x-auto">
          <table className="text-xs lg:text-base">
            <thead>
              <tr>
                <th>登录ID</th>
                <th>鉴权ID</th>
                <th>设备</th>
                <th>操作系统</th>
                <th>浏览器</th>
                <th>IP</th>
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Card className="mx-3 lg:mx-0">
        <Card.Header title="登录记录" hasMore={false} />
        <div className="prose max-w-none w-full overflow-x-auto">
          <table className="text-xs lg:text-base">
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

      <div className="my-3 text-right mx-3 lg:mx-0">
        <Paginate
          page={loginLogPaginate.page}
          totalPage={loginLogPaginate.total_page}
          baseUrl="/user"
        />
      </div>
    </>
  );
}
