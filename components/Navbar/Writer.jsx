import React from "react";
import { PencilSquareIcon, HandRaisedIcon } from "@heroicons/react/24/outline";
import { PopoverBar } from "./Popover";

export default function Writer() {
  return (
    <PopoverBar icon={<PencilSquareIcon />} className="">
      <ul className="flex flex-col space-y-3">
        <li>
          <a
            href=""
            className="flex flex-col rounded bg-blue-500 hover:bg-blue-600 p-2 text-white"
          >
            <div className="flex justify-start items-center space-x-1">
              <span className="text-xl">我要投稿</span>
              <span>
                <PencilSquareIcon className="w-4 h-4" />
              </span>
            </div>
            <div className="text-sm text-gray-200">
              如果你有好的专题教程，请向我们投稿。除了获取站内奖励，还有机会分成该专题的收益。
            </div>
          </a>
        </li>
        <li>
          <a href="" className="flex flex-col rounded hover:bg-gray-50 p-2">
            <div className="flex justify-start items-center space-x-1">
              <span className="text-xl">请求教程</span>
              <span>
                <HandRaisedIcon className="w-4 h-4" />
              </span>
            </div>
            <div className="text-sm text-gray-500">
              你可以在这里请求那些本站暂未收录的专题。
            </div>
          </a>
        </li>
      </ul>
    </PopoverBar>
  );
}
