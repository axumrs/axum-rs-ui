import React from "react";
import PageMeta from "../../components/PageMeta";
import Card from "../../components/Card";
import { HashtagIcon, Square2StackIcon } from "@heroicons/react/24/outline";
import TopicListItem from "../../components/TopicListItem";
import Paginate from "../../components/Paginate";

export default function TagDetail() {
  return (
    <>
      <PageMeta>标签1</PageMeta>
      <Card>
        <div>
          <div
            className={`flex p-4  rounded-lg justify-center items-center space-x-2`}
          >
            <div className="flex-shrink-0  flex flex-col justify-center items-center">
              <HashtagIcon className="w-6 h-6" />
            </div>
            <div className="">
              <h3 className="text-lg font-semibold">标签1</h3>
            </div>
          </div>
          <div className="flex justify-center items-center text-gray-600 text-sm space-x-2">
            <div>
              <Square2StackIcon className="w-4 h-4" />
            </div>
            <div>共有 123 篇文章</div>
          </div>
        </div>
      </Card>

      <Card className="my-3">
        <ul className="flex flex-col divide-y">
          <li className="py-2">
            <TopicListItem
              subject={{
                slug: "1",
                name: "全栈：AXUM、React、NextJS 和 TailWindCSS",
              }}
              topic={{
                slug: "1",
                title: "React: SEO挑战、服务端渲染及本地存储",
                summary:
                  "经过紧张的学习，React课程终于暂告一个段落了。本章将是一个相对轻松的内容，我们一起探讨一下React 应用的 SEO 以及为什么需要服务端渲染，同时对 React课程做个简单的小结。",
                cover: "",
                tags: ["标签1", "标签2"],
                try_readable: false,
              }}
            />
          </li>

          <li className="py-2">
            <TopicListItem
              subject={{
                slug: "2",
                name: "全栈：AXUM、React、NextJS 和 TailWindCSS",
              }}
              topic={{
                slug: "2",
                title: "React: SEO挑战、服务端渲染及本地存储",
                summary:
                  "经过紧张的学习，React课程终于暂告一个段落了。本章将是一个相对轻松的内容，我们一起探讨一下React 应用的 SEO 以及为什么需要服务端渲染，同时对 React课程做个简单的小结。",
                cover:
                  "https://cdn.hashnode.com/res/hashnode/image/upload/v1684170814296/50fd7774-8684-45b1-ab70-6e5f82707b3f.png?w=1600&h=840&fit=crop&crop=entropy&auto=compress,format&format=webp",
                tags: ["标签1", "标签2"],
                try_readable: true,
              }}
            />
          </li>
          <li className="py-2">
            <TopicListItem
              subject={{
                slug: "3",
                name: "全栈：AXUM、React、NextJS 和 TailWindCSS",
              }}
              topic={{
                slug: "3",
                title: "React: SEO挑战、服务端渲染及本地存储",
                summary:
                  "经过紧张的学习，React课程终于暂告一个段落了。本章将是一个相对轻松的内容，我们一起探讨一下React 应用的 SEO 以及为什么需要服务端渲染，同时对 React课程做个简单的小结。",
                cover: "",
                tags: ["标签1", "标签2"],
                try_readable: true,
              }}
            />
          </li>
          <li className="py-2">
            <TopicListItem
              subject={{
                slug: "4",
                name: "全栈：AXUM、React、NextJS 和 TailWindCSS",
              }}
              topic={{
                slug: "4",
                title: "React: SEO挑战、服务端渲染及本地存储",
                summary:
                  "经过紧张的学习，React课程终于暂告一个段落了。本章将是一个相对轻松的内容，我们一起探讨一下React 应用的 SEO 以及为什么需要服务端渲染，同时对 React课程做个简单的小结。",
                cover: "",
                tags: ["标签1", "标签2"],
                try_readable: false,
              }}
            />
          </li>

          <li className="py-2">
            <TopicListItem
              subject={{
                slug: "5",
                name: "全栈：AXUM、React、NextJS 和 TailWindCSS",
              }}
              topic={{
                slug: "5",
                title: "React: SEO挑战、服务端渲染及本地存储",
                summary:
                  "经过紧张的学习，React课程终于暂告一个段落了。本章将是一个相对轻松的内容，我们一起探讨一下React 应用的 SEO 以及为什么需要服务端渲染，同时对 React课程做个简单的小结。",
                cover:
                  "https://cdn.hashnode.com/res/hashnode/image/upload/v1684170814296/50fd7774-8684-45b1-ab70-6e5f82707b3f.png?w=1600&h=840&fit=crop&crop=entropy&auto=compress,format&format=webp",
                tags: ["标签1", "标签2"],
                try_readable: false,
              }}
            />
          </li>
          <li className="py-2">
            <TopicListItem
              subject={{
                slug: "6",
                name: "全栈：AXUM、React、NextJS 和 TailWindCSS",
              }}
              topic={{
                slug: "6",
                title: "React: SEO挑战、服务端渲染及本地存储",
                summary:
                  "经过紧张的学习，React课程终于暂告一个段落了。本章将是一个相对轻松的内容，我们一起探讨一下React 应用的 SEO 以及为什么需要服务端渲染，同时对 React课程做个简单的小结。",
                cover: "",
                tags: ["标签1", "标签2"],
                try_readable: true,
              }}
            />
          </li>
        </ul>
      </Card>

      <div className="mb-3 text-right">
        <Paginate />
      </div>
    </>
  );
}
