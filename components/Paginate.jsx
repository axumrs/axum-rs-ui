import Link from "next/link";
import React from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/24/outline";

export default function Paginate({ totalPage, page, baseUrl }) {
  const pages = calcPageNums(totalPage, page);

  const prePage = page > 0 ? page - 1 : 0;
  const nextPage = page < totalPage - 1 ? page + 1 : totalPage - 1;

  return (
    <>
      <ul className={`inline-flex justify-start items-center space-x-1`}>
        <PaginateItem href={`${baseUrl}?page=0`} sm={false}>
          <ChevronDoubleLeftIcon className="w-4 h-4" />
        </PaginateItem>
        <PaginateItem href={`${baseUrl}?page=${prePage}`} sm={false}>
          <ChevronLeftIcon className="w-4 h-4" />
        </PaginateItem>
        <PaginateNumList pages={pages} baseUrl={baseUrl} page={page} />
        <PaginateItem href={`${baseUrl}?page=${nextPage}`} sm={false}>
          <ChevronRightIcon className="w-4 h-4" />
        </PaginateItem>
        <PaginateItem href={`${baseUrl}?page=${totalPage - 1}`} sm={false}>
          <ChevronDoubleRightIcon className="w-4 h-4" />
        </PaginateItem>
      </ul>
    </>
  );
}

function PaginateItem({ children, href = "", active = false, sm = true }) {
  const activeCss = active ? "border px-2 py-1 bg-gray-100 rounded" : "p-1";
  const textCss = sm ? "text-sm" : "text-base";
  return (
    <li className="">
      <Link
        href={href}
        className={`block  ${textCss}  ${activeCss} hover:text-blue-500 `}
      >
        {children}
      </Link>
    </li>
  );
}

function PaginateNumList({ pages, baseUrl, page }) {
  return (
    <>
      {pages.map((i) => (
        <PaginateItem
          key={`paginate-${i}`}
          href={`${baseUrl}?page=${i}`}
          active={i === page}
        >
          {i + 1}
        </PaginateItem>
      ))}
    </>
  );
}

function calcPageNums(totalPage, page, perPageNums = 5) {
  let _ns = [];
  const lastPage = totalPage - 1;

  if (page < perPageNums - 1) {
    for (let i = 0; i < perPageNums && i <= lastPage; i++) {
      _ns.push(i);
    }
    return _ns;
  }

  let half = Math.floor(perPageNums / 2);
  half = half % 2 ? half - 1 : half;

  let leftHalfNs = [];
  let rightHalfNs = [];

  for (let i = half; i > 0; i--) {
    leftHalfNs.push(page - i);
  }

  for (let i = 1; i <= half; i++) {
    rightHalfNs.push(page + i);
  }

  let needRevalueLeft = leftHalfNs.filter((n) => n < 0).length > 0;
  let needRevalueRight = rightHalfNs.filter((n) => n > lastPage).length > 0;

  if (needRevalueLeft) {
    const _tmp = Math.abs(leftHalfNs[0]);
    for (let i = 0; i < leftHalfNs.length; i++) {
      leftHalfNs[i] += _tmp;
    }
  }

  _ns = [...leftHalfNs, page, ...rightHalfNs];

  if (needRevalueRight) {
    for (let i = 0; i < perPageNums; i++) {
      _ns[i] = lastPage - i;
    }
    _ns.reverse();
  }

  return _ns;
}
