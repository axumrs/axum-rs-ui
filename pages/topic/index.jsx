import React from "react";
import PageMeta from "../../components/PageMeta";
import PageTitle from "../../components/PageTitle";
import Card from "../../components/Card";
import TopicListItem from "../../components/TopicListItem";
import Paginate from "../../components/Paginate";

export default function TopicIndex() {
  return (
    <>
      <PageMeta>文章</PageMeta>
      <PageTitle>文章</PageTitle>

      <Card>
        <ul className="flex flex-col divide-y -mt-2">
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

      <div className="my-3 text-right">
        <Paginate />
      </div>
    </>
  );
}
