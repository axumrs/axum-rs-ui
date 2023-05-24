import React from "react";
import PageMeta from "../../components/PageMeta";
import Card from "../../components/Card";
import { HashtagIcon, Square2StackIcon } from "@heroicons/react/24/outline";
import TopicListItem from "../../components/TopicListItem";
import Paginate from "../../components/Paginate";
import { get } from "../../fetcher/fetcher";

export default function TagDetail({ tag, topicPaginate }) {
  const { data: ts } = topicPaginate;
  return (
    <>
      <PageMeta>{tag.name}</PageMeta>
      {/* <div>{JSON.stringify(tag)}</div>
      <div>{JSON.stringify(topicPaginate)}</div> */}

      <Card className="mx-3 lg:mx-0">
        <div>
          <div
            className={`flex p-4  rounded-lg justify-center items-center space-x-2`}
          >
            <div className="flex-shrink-0  flex flex-col justify-center items-center">
              <HashtagIcon className="w-6 h-6" />
            </div>
            <div className="">
              <h3 className="text-lg font-semibold">{tag.name}</h3>
            </div>
          </div>
          <div className="flex justify-center items-center text-gray-600 text-sm space-x-2">
            <div>
              <Square2StackIcon className="w-4 h-4" />
            </div>
            <div>共有 {topicPaginate.total} 篇文章</div>
          </div>
        </div>
      </Card>

      <Card className="my-3 mx-3 lg:mx-0">
        <ul className="flex flex-col divide-y">
          {ts.map((t) => (
            <li className="py-2" key={t.id}>
              <TopicListItem
                subject={{
                  slug: t.subject_slug,
                  name: t.subject_name,
                }}
                topic={{
                  ...t,
                  tags: t.tag_names.split(","),
                }}
              />
            </li>
          ))}
        </ul>
      </Card>

      <div className="mb-3 text-right mx-3 lg:mx-0">
        <Paginate
          baseUrl={`/tag/${tag.name}`}
          page={topicPaginate.page}
          totalPage={topicPaginate.total_page}
        />
      </div>
    </>
  );
}

export async function getServerSideProps({ params, query }) {
  const { name } = params;
  const { page: pageStr } = query;
  const page = parseInt(pageStr, 10) || 0;

  const [{ data: tag }, { data: topicPaginate }] = await Promise.all([
    get(`/tag/${name}`),
    get(`/topic?tag_name=${name}&page=${page}&page_size=30`),
  ]);

  return { props: { tag, topicPaginate } };
}
