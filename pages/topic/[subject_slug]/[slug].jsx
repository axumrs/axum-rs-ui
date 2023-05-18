import React, { useEffect } from "react";
import Card from "../../../components/Card";
import PageMeta from "../../../components/PageMeta";
import Link from "next/link";
import {
  NewspaperIcon,
  EyeIcon,
  CalendarDaysIcon,
  TagIcon,
} from "@heroicons/react/24/outline";
import "highlight.js/styles/github.css";
import hljs from "highlight.js";
import { get } from "../../../fetcher/fetcher";

export default function TopicDetail({ topic }) {
  useEffect(() => {
    hljs.highlightAll();
  }, []);

  return (
    <>
      <PageMeta>
        {topic.title} - {topic.subject_name}
      </PageMeta>

      {/* <div>{JSON.stringify(topic)}</div> */}

      {topic.cover && (
        <div className="mb-3">
          <img
            src="https://cdn.hashnode.com/res/hashnode/image/upload/v1684170814296/50fd7774-8684-45b1-ab70-6e5f82707b3f.png?w=1600&h=840&fit=crop&crop=entropy&auto=compress,format&format=webp"
            className="w-full object-cover rounded-md border"
          />
        </div>
      )}

      <Card className="">
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-xl font-bold lg:text-3xl lg:font-extrabold">
            {topic.title}
          </h1>
          <div className="flex justify-start items-center text-gray-600 text-sm space-x-1 my-3">
            <span>
              <NewspaperIcon className="w-4 h-4" />
            </span>
            <Link
              href={`/subject/${topic.subject_slug}`}
              className="hover:underline hover:decoration-dotted hover:text-gray-700"
            >
              {topic.subject_name}
            </Link>
          </div>
          <div className="flex justify-start items-center text-gray-500 text-xs space-x-2">
            <div className="flex justify-start items-center space-x-1">
              <span>
                <EyeIcon className="w-4 h-4" />
              </span>
              <span>{topic.hit}</span>
            </div>
            <div className="flex justify-start items-center space-x-1">
              <span>
                <CalendarDaysIcon className="w-4 h-4" />
              </span>
              <span>{datelineFormat(topic.dateline)}</span>
            </div>
          </div>
          <div className="flex justify-start items-center text-gray-500 text-xs space-x-1 mt-3">
            <span>
              <TagIcon className="w-4 h-4" />
            </span>
            {topic.tag_names
              .split(",")
              .filter((t) => t.trim().length > 0)
              .map((t) => (
                <Link
                  key={`topic-${topic.id}-tag-${t}`}
                  className="before:content-['#'] hover:underline hover:decoration-dashed"
                  href={`/tag/${t}`}
                >
                  {t}
                </Link>
              ))}
          </div>
        </div>
      </Card>

      <Card className="my-3">
        <div
          dangerouslySetInnerHTML={{ __html: topic.html }}
          className="prose max-w-none lg:prose-xl"
        ></div>
      </Card>
    </>
  );
}

export async function getServerSideProps({ params }) {
  const { subject_slug, slug } = params;

  const { data: topic } = await get(`/topic/${subject_slug}/${slug}`);

  return { props: { topic } };
}

function datelineFormat(dateline) {
  const d = new Date(dateline);
  return `${d.getFullYear()}/${
    d.getMonth() + 1
  }/${d.getDate()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
}
