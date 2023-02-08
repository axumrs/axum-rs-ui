import React, { useState } from "react";
import {
  UserCircleIcon,
  ArrowTopRightOnSquareIcon,
  ChevronUpIcon,
} from "@heroicons/react/24/outline";

export default function User({ className = "" }) {
  const css = `relative ${className}`;
  const [open, setOpen] = useState(false);
  return (
    <div className={css}>
      <button
        type="button"
        onClick={() => {
          setOpen(!open);
        }}
      >
        <UserCircleIcon className="h-8 w-8" />
      </button>
      <div
        className={`${
          open ? "block" : "hidden"
        } absolute top-[1.98rem] w-6 h-6  z-[11] bg-white text-gray-200 md:top-8`}
      >
        <ChevronUpIcon />
      </div>
      <div
        className={`${
          open ? "block" : "hidden"
        } absolute top-[2.7rem] -right-3 bg-white border z-10 min-h-fit w-56 rounded-lg p-3 shadow-md md:w-60 md:p-6 md:top-12 md:-right-3`}
      >
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
      </div>
    </div>
  );
}
