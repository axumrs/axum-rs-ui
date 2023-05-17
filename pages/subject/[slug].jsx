import React from "react";
import PageMeta from "../../components/PageMeta";
import Card from "../../components/Card";
import {
  CurrencyDollarIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/solid";
import TopicListItem from "../../components/TopicListItem";

export default function SubjectDetail() {
  return (
    <>
      <PageMeta>全栈：AXUM、React、NextJS 和 TailWindCSS</PageMeta>

      <Card className="">
        <div className="p-8">
          <div
            className={`flex p-4  rounded-lg justify-center items-center space-x-2`}
          >
            <div className="flex-shrink-0 bg-red-50 flex flex-col justify-center items-center">
              <img
                src="https://cdn.hashnode.com/res/hashnode/image/upload/v1607082785538/EryuLRriM.png?w=200&h=200&fit=crop&crop=entropy&auto=compress,format&format=webp"
                className="w-10 object-cover rounded"
              />
            </div>
            <div className="">
              <h3 className="text-lg font-semibold">
                全栈：AXUM、React、NextJS 和 TailWindCSS
              </h3>
            </div>
          </div>
          <div className="my-3 text-center">
            本专题将带你学习全栈开发所需的相关前端工具链，并在最后通过一个案例来实战全栈开发
          </div>
          <div className="mt-6 flex justify-center items-center space-x-1">
            <span className="text-sm border bg-orange-600 text-white rounded px-2 py-1">
              连载中
            </span>
            <span className="text-sm border bg-emerald-600 text-white rounded px-2 py-1">
              免费
            </span>
            <span className="text-sm border bg-green-600 text-white rounded px-2 py-1">
              已完结
            </span>
            <div className="flex justify-start items-center space-x-1 text-red-600 rounded px-2 py-1 border border-red-600">
              <CurrencyDollarIcon className="w-4 h-4" />
              <span className="">12345</span>
            </div>
            <a
              href=""
              className="border border-blue-700 text-white bg-blue-600 px-2 py-1 rounded"
            >
              <ShoppingCartIcon className="w-6 h-6" />
            </a>
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
    </>
  );
}
