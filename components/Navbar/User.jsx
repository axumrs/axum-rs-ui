import React, { useState } from "react";
import {
  UserCircleIcon,
  ArrowTopRightOnSquareIcon,
  ChevronUpIcon,
} from "@heroicons/react/24/outline";
import { PopoverBar } from "./Popover";

export default function User({ className = "" }) {
  return (
    <PopoverBar className={className} icon={<UserCircleIcon />}>
      <div className="flex flex-col justify-center items-center m-6">
        <UserCircleIcon className="h-16 w-16" />
      </div>
      <p className="my-3">请登录你的账号以便享受更优质的服务</p>
      <p className="text-gray-600 text-xs">
        登录并订阅之后，你可以关闭人机验证及其它权益。
        <a
          href=""
          className="inline-flex justify-start items-center space-x-1 underline decoration-dashed"
        >
          <span>了解用户权益</span>
          <ArrowTopRightOnSquareIcon className="w-3 h-3 " />
        </a>
      </p>
      <div className="flex justify-between mt-3">
        <a
          href="/login"
          className="border rounded-full bg-blue-500 text-white border-blue-600 px-6 py-2 hover:bg-blue-600 hover:border-blue-700"
        >
          登录
        </a>
        <a
          href="/register"
          className="border rounded-full text-blue-500 bg-white border-blue-600 px-6 py-2 hover:text-blue-600 hover:border-blue-700"
        >
          注册
        </a>
      </div>
    </PopoverBar>
  );
}
