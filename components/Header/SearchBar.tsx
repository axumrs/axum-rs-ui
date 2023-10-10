"use client";

import React, { useRef } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function SearchBar({ className = "" }: ClassNameProps) {
  const ref = useRef<HTMLFormElement>() as React.RefObject<HTMLFormElement>;

  return (
    <form
      action="https://www.google.com/search"
      method="get"
      className={`hidden lg:flex relative  justify-start items-center border rounded-full px-2 py-2 bg-gray-50 group focus-within:border-gray-700 ${className} transition-all`}
      ref={ref}
      target="_blank"
    >
      <div className="block absolute w-6 h-6 bg-transparent">
        <MagnifyingGlassIcon />
      </div>

      <input type="hidden" name="q" value="site:axum.rs" />
      <input
        type="text"
        placeholder="输入关键字，按回车进行搜索"
        name="q"
        className="block  ml-7 w-full outline-none bg-transparent focus:mr-6 transition-all"
        onKeyUp={(e) => {
          if (e.key === "Enter") {
            ref.current?.submit();
          }
        }}
      />
    </form>
  );
}
