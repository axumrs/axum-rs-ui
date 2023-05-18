import Link from "next/link";
import React from "react";
import PageMeta from "../../components/PageMeta";
import PageTitle from "../../components/PageTitle";
import Card from "../../components/Card";
import Paginate from "../../components/Paginate";
import { get } from "../../fetcher/fetcher";

export default function TagIndex({ tagPaginate }) {
  const { data: tagList } = tagPaginate;
  return (
    <>
      <PageMeta>标签</PageMeta>
      <PageTitle>标签</PageTitle>
      {/* <div>{JSON.stringify(tagPaginate)}</div> */}

      <Card>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 p-2 lg:gap-6">
          {tagList.map((t) => (
            <TagItem key={t.name} name={t.name} topicNum={t.topic_total} />
          ))}
        </div>
      </Card>

      <div className="my-3 text-right">
        <Paginate
          totalPage={tagPaginate.total_page}
          page={tagPaginate.page}
          baseUrl="/tag"
        />
      </div>
    </>
  );
}

function TagItem({ name, topicNum = 0 }) {
  return (
    <>
      <Link
        href={`/tag/${name}`}
        className="flex flex-col justify-center items-center border rounded-md space-y-2 px-2 py-3 bg-gray-50/90  odd:bg-gray-50/95 hover:bg-gray-50/100 hover:ring-1 lg:transition-all lg:hover:scale-105"
      >
        <h3 className="text-lg font-normal">{name}</h3>
        <div className="text-sm text-gray-600">共有 {topicNum} 篇文章</div>
      </Link>
    </>
  );
}

export async function getServerSideProps({ query }) {
  const { page: pageStr } = query;
  const page = parseInt(pageStr, 10) || 0;

  const { data: tagPaginate } = await get(`/tag?page=${page}&page_size=30`);

  return { props: { tagPaginate } };
}
