import React from "react";
import PageMeta from "../../components/PageMeta";
import PageTitle from "../../components/PageTitle";
import Card from "../../components/Card";
import TopicListItem from "../../components/TopicListItem";
import Paginate from "../../components/Paginate";
import { get } from "../../fetcher/fetcher";

export default function TopicIndex({ topicPaginate }) {
  const { data: topicList } = topicPaginate;
  return (
    <>
      <PageMeta>文章</PageMeta>
      <PageTitle>文章</PageTitle>
      {/* <div>{JSON.stringify(topicPaginate)}</div> */}

      <Card>
        <ul className="flex flex-col divide-y">
          {topicList.map((t) => (
            <li className="py-2">
              <TopicListItem
                subject={{
                  slug: t.subject_slug,
                  name: t.subject_name,
                }}
                topic={{ ...t, tags: t.tag_names.split(",") }}
              />
            </li>
          ))}
        </ul>
      </Card>

      <div className="my-3 text-right">
        <Paginate
          page={topicPaginate.page}
          totalPage={topicPaginate.total_page}
          baseUrl="/topic"
        />
      </div>
    </>
  );
}

export async function getServerSideProps({ query }) {
  const { page: pageStr } = query;
  const page = parseInt(pageStr) || 0;
  const { data: topicPaginate } = await get(
    `/topic?page=${page}&page_size=30&is_del=false`
  );

  return { props: { topicPaginate } };
}
