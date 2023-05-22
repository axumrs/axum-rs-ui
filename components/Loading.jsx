import React from "react";

export default function Loading({ children = "正在载入" }) {
  return (
    <div className="absolute inset-0 bg-gray-500/70 z-50 flex flex-col items-center justify-center  ">
      <span className="bg-orange-600 text-white px-3 py-2 border border-orange-700 rounded shadow">
        {children}
      </span>
    </div>
  );
}
