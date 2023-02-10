import React, { useState } from "react";
import { MagnifyingGlassIcon, XCircleIcon } from "@heroicons/react/24/outline";
import Form from "../Form";

export default function SearchBar({ className }) {
  const [keyword, setKeyword] = useState("");
  const submiter = () => {
    console.log("提交");
  };
  return (
    <Form
      action=""
      method="get"
      className={`hidden lg:flex relative  justify-start items-center border rounded-full px-2 py-2 bg-gray-50 group focus-within:border-gray-700 ${className} transition-all`}
      submiter={submiter}
    >
      <div className="block absolute w-6 h-6 bg-transparent">
        <MagnifyingGlassIcon className="" />
      </div>

      <input
        type="text"
        placeholder="输入关键字，按回车进行搜索"
        onChange={(e) => {
          setKeyword(e.target.value);
        }}
        value={keyword}
        className="block  ml-7 w-full outline-none bg-transparent focus:mr-6 transition-all"
      />

      <button
        type="button"
        className="hidden absolute  right-2 w-5 h-5 overflow-hidden text-xs group-focus-within:block text-gray-500"
        onClick={() => {
          setKeyword("");
        }}
      >
        <XCircleIcon />
      </button>
    </Form>
  );
}
