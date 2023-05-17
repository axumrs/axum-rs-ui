import Link from "next/link";
import React from "react";
import PageMeta from "../../components/PageMeta";
import PageTitle from "../../components/PageTitle";
import Card from "../../components/Card";
import Paginate from "../../components/Paginate";

export default function TagIndex() {
  let testArr = [];
  for (let i = 1; i <= 30; i++) {
    testArr.push(i);
  }
  return (
    <>
      <PageMeta>标签</PageMeta>
      <PageTitle>标签</PageTitle>

      <Card>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 p-2 lg:gap-6">
          {testArr.map((v) => (
            <TagItem key={v} name={`标签${v}`} topicNum={v} />
          ))}
        </div>
      </Card>

      <div className="my-3 text-right">
        <Paginate />
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
