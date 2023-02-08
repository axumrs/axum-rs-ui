import React from "react";
import { BellIcon } from "@heroicons/react/24/outline";

export default function Notice({ hasNotice = true }) {
  return (
    <div className="relative">
      <a className="block w-full h-full" href="">
        <BellIcon className="w-8 h-8" />
        {hasNotice ? (
          <span className="absolute top-0 right-0 block rounded-full bg-red-500 text-white text-xs font-thin w-3 h-3"></span>
        ) : (
          <></>
        )}
      </a>
    </div>
  );
}
