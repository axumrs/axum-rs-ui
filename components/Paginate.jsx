import React from "react";

export default function Paginate() {
  return (
    <>
      <ul className={`inline-flex justify-start items-center space-x-1`}>
        <PaginateItem href="">«</PaginateItem>
        <PaginateItem href="">1</PaginateItem>
        <PaginateItem href="" active>
          2
        </PaginateItem>
        <PaginateItem href="">3</PaginateItem>
        <PaginateMore />
        <PaginateItem href="">100</PaginateItem>
        <PaginateItem href="">»</PaginateItem>
      </ul>
    </>
  );
}

function PaginateItem({ children, href = "", active = false }) {
  const activeCss = active ? "border-gray-300" : "border-transparent";
  return (
    <li className="">
      <a
        href={href}
        className={`block px-2 py-1  rounded text-sm border ${activeCss} hover:border-gray-300 `}
      >
        {children}
      </a>
    </li>
  );
}
function PaginateMore() {
  return <li className="before:content-['...'] before:text-gray-500"></li>;
}
