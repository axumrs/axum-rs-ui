import React from "react";

export default function Row({ label, children = <></>, id }) {
  return (
    <div className="flex flex-col justify-start items-start space-y-1">
      <label htmlFor={id}>{label}</label>
      {children}
    </div>
  );
}
