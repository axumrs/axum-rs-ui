import Link from "next/link";
import React from "react";

export default function SubjectListItem({
  href,
  name,
  summary,
  className = "",
  img,
  truncate = true,
}) {
  const truncateCss = truncate ? "truncate" : "";

  return (
    <>
      <div
        className={`grid grid-cols-12 p-4 bg-gray-100 rounded-lg gap-x-2 hover:bg-gray-200 ${className}`}
      >
        <div className=" col-span-2 lg:col-span-1">
          <img src={img} className="w-full h-full object-scale-down" />
        </div>
        <div className="col-span-10 lg:col-span-11">
          <h3 className={truncateCss}>
            <Link href={href} className="text-lg font-semibold hover:underline">
              {name}
            </Link>
          </h3>
          <div className={truncateCss}>{summary}</div>
        </div>
      </div>
    </>
  );
}
