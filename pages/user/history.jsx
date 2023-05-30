import React, { useEffect, useState } from "react";
import PageMeta from "../../components/PageMeta";
import PageTitle from "../../components/PageTitle";
import Card from "../../components/Card";
import Toast from "../../components/Toast";
import Loading from "../../components/Loading";
import TopicListItem from "../../components/TopicListItem";
import Paginate from "../../components/Paginate";
import { geta } from "../../fetcher/fetcher";
import datelineFormat from "../../utils/dtf";
import code from "../../utils/code";
import { useRouter } from "next/router";
import { nanoid } from "nanoid";

export default function UserHistory({ page }) {
  const [historyPaginate, setHistoryPaginate] = useState({
    page,
    total_page: 0,
    data: [],
  });
  const [toast, setToast] = useState("");
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    geta(`/user/history?page=${page}&page_size=30`)
      .then((res) => {
        if (res?.code === code.OK) {
          setHistoryPaginate({ ...res?.data });
          return;
        }
        if (res?.code === code.Jwt) {
          router.push("/login?r=/user/history");
          return;
        }
        if (res?.code === code.MustSubscribe) {
          setToast(
            "你只能查看第一页记录，如需要查看全部记录，请升级为订阅用户"
          );

          router.push("/user/history");

          return;
        }
        if (res?.code !== code.OK) {
          setToast("操作失败，请检查你的网络");
          return;
        }
      })
      .catch((e) => {
        console.log(e);
        setToast("操作失败，请检查你的网络");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [page]);
  return (
    <>
      <PageMeta>学习记录</PageMeta>
      <PageTitle>学习记录</PageTitle>

      {/* <div>{JSON.stringify(historyPaginate)}</div> */}

      {toast && (
        <Toast.Error
          callback={() => {
            setToast("");
          }}
        >
          {toast}
        </Toast.Error>
      )}
      {isLoading && <Loading />}
      <Card className="mx-3 lg:mx-0">
        {historyPaginate.data && historyPaginate.data.length > 0 ? (
          <ul className="flex flex-col divide-y">
            {historyPaginate.data.map((h) => (
              <li key={`history-${h?.id}-${nanoid()}`} className="py-2">
                <Item
                  subject={{ slug: h.subject_slug, name: h.subject_name }}
                  topic={{ ...h, tags: h.tag_names.split(",") }}
                  dateline={h?.dateline}
                />
              </li>
            ))}
          </ul>
        ) : (
          <>没有记录</>
        )}
      </Card>
      {historyPaginate?.total_page > 0 && (
        <div className="my-3 text-right mx-3 lg:mx-0">
          <Paginate
            page={historyPaginate?.page}
            totalPage={historyPaginate?.total_page}
            baseUrl="/user/history"
          />
        </div>
      )}
    </>
  );
}

function Item({ subject, topic, dateline }) {
  return (
    <>
      <div className="flex flex-col space-y-2">
        <div className="text-cyan-800 text-sm w-full">
          你在 {datelineFormat(dateline)} 学习过
        </div>
        <TopicListItem {...{ subject, topic }} className="w-full shrink-0" />
      </div>
    </>
  );
}

export async function getServerSideProps({ query }) {
  const { page: pageStr } = query;
  const page = parseInt(pageStr) || 0;

  return { props: { page } };
}
