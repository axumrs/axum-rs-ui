import Link from "next/link";
import React from "react";
import {
  ChevronDownIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/24/outline";

export default function Paginate({ totalPage, page, baseUrl }) {
  const pages = calShowPages(totalPage, page);
  const prePage = page > 0 ? page - 1 : 0;
  const nextPage = page < totalPage - 1 ? page + 1 : totalPage - 1;

  return (
    <>
      <ul className={`inline-flex justify-start items-center space-x-1`}>
        <PaginateItem href={`${baseUrl}?page=${prePage}`} sm={false}>
          <ChevronDoubleLeftIcon className="w-4 h-4" />
        </PaginateItem>
        <PaginateNumList pages={pages} baseUrl={baseUrl} page={page} />
        <PaginateItem href={`${baseUrl}?page=${nextPage}`} sm={false}>
          <ChevronDoubleRightIcon className="w-4 h-4" />
        </PaginateItem>
      </ul>
    </>
  );
}

function PaginateItem({ children, href = "", active = false, sm = true }) {
  const activeCss = active ? "text-red-600" : "";
  const textCss = sm ? "text-sm" : "text-base";
  return (
    <li className="">
      <Link
        href={href}
        className={`block px-2 py-1  ${textCss}  ${activeCss} hover:text-blue-500 `}
      >
        {children}
      </Link>
    </li>
  );
}

function PaginateNumList({ pages, baseUrl, page }) {
  return (
    <li className="relative min-w-min group">
      <div className="flex justify-center items-center space-x-1 cursor-pointer">
        <span className="font-normal">第 {page + 1} 页</span>
        <span>
          <ChevronDownIcon className="w-3 h-3 group-hover:rotate-180" />
        </span>
      </div>
      <ul className="absolute hidden z-10 top-6 right-0 w-full group-hover:flex flex-col items-center justify-center border rounded px-3 py-1 bg-white">
        {pages.map((i) => (
          <PaginateItem
            key={`paginate-${i}`}
            href={`${baseUrl}?page=${i}`}
            active={i === page}
          >
            {i + 1}
          </PaginateItem>
        ))}
      </ul>
    </li>
  );
}
function PaginateMore() {
  return <li className="before:content-['...'] before:text-gray-500"></li>;
}
function calShowPages(totalPage, page) {
  // const limit = 5;
  let pages = [];
  // if (totalPage <= limit) {
  //   for (let i = 0; i < totalPage; i++) {
  //     pages.push(i);
  //   }
  // } else {
  //   if (page < limit - 1) {
  //     for (let i = 1; i < limit - 1; i++) {
  //       pages.push(i);
  //     }
  //     pages.push(page);
  //   }
  //   pages.push();
  // }

  for (let i = 0; i < totalPage; i++) {
    pages.push(i);
  }

  return pages;
}
