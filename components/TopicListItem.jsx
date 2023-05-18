import React from "react";
import { NewspaperIcon, BookmarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
export default function TopicListItem({
  subject = { slug: "", name: "" },
  topic = {
    slug: "",
    title: "",
    summary: "",
    cover: "",
    tags: [],
    try_readable: false,
  },
  showSubject = true,
}) {
  return (
    <div className="p-1 hover:bg-slate-50 hover:rounded-md">
      {showSubject && (
        <div className="flex justify-start items-center space-x-1 text-gray-500 text-sm">
          <span>
            <NewspaperIcon className="w-4 h-4" />
          </span>
          <Link
            href={`/subject/${subject.slug}`}
            className="hover:underline hover:decoration-dashed"
          >
            {subject.name}
          </Link>
        </div>
      )}

      <div className="flex  flex-col-reverse justify-start items-start space-y-6 lg:flex-row lg:space-x-1 lg:space-y-0">
        <div className="my-2 flex-shrink-0 w-full lg:w-3/4 ">
          <div className="flex justify-start items-center space-x-1">
            <h3 className="my-2 flex-shrink-0">
              <Link
                href={`/topic/${subject.slug}/${topic.slug}`}
                className="text-lg font-bold lg:text-xl lg:font-extrabold hover:text-rose-800"
              >
                {topic.title}
              </Link>
            </h3>
            {topic.try_readable ? (
              <span className="bg-cyan-500 text-white text-xs rounded-md py-[0.125rem] px-1 border border-cyan-600">
                支持试读
              </span>
            ) : (
              <></>
            )}
          </div>
          <p className="font-normal">{topic.summary}</p>
        </div>
        {topic.cover ? (
          <div className="w-full mt-6 lg:w-1/4">
            <img
              src="https://cdn.hashnode.com/res/hashnode/image/upload/v1684170814296/50fd7774-8684-45b1-ab70-6e5f82707b3f.png?w=1600&h=840&fit=crop&crop=entropy&auto=compress,format&format=webp"
              className="w-full object-cover rounded-lg"
            />
          </div>
        ) : (
          <></>
        )}
      </div>
      <div className="flex justify-start items-start w-full  overflow-x-auto space-x-1 text-gray-500">
        <span className="inline-block flex-shrink-0">
          <BookmarkIcon className="w-4 h-4" />
        </span>
        {topic.tags.map((tag) => (
          <Link
            key={`topic-${subject.slug}-${topic.slug}-tag-${tag}`}
            href={`/tag/${tag}`}
            className="inline-block flex-shrink-0 text-xs before:content-['#'] hover:underline"
          >
            {tag}
          </Link>
        ))}
      </div>
    </div>
  );
}
