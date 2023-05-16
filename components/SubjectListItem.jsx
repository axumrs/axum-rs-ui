import React from "react";

export default function SubjectListItem({
  href,

  name,
  summary,
  className = "",
  img,
}) {
  return (
    <>
      <div
        className={`flex p-4 bg-gray-100 rounded-lg justify-start items-center space-x-2 ${className}`}
      >
        <div className="flex-shrink-0 w-1/12 bg-red-50 flex flex-col justify-center items-center">
          <img src={img} className="w-full" />
        </div>
        <div className="w-11/12">
          <h3 className="truncate">
            <a href={href} className="text-lg font-semibold">
              {name}
            </a>
          </h3>
          <div className="truncate">{summary}</div>
        </div>
      </div>
    </>
  );
}
