import React, { useState } from "react";
import { ChevronUpIcon } from "@heroicons/react/24/outline";

export default function Popover({
  open = false,
  children,
  className = "",
  id = "",
}) {
  const fullClassName = `${
    open ? "block" : "hidden"
  } absolute top-[2.7rem] -right-3 bg-white border z-10 min-h-fit w-56 rounded-lg p-3 shadow-md lg:w-60 lg:p-6 lg:top-12 lg:-right-3`;
  return (
    <>
      <div
        className={`${
          open ? "block" : "hidden"
        } absolute top-[1.98rem] w-6 h-6  z-[11] bg-white text-gray-200 lg:top-8`}
      >
        <ChevronUpIcon />
      </div>
      <div className={fullClassName}>{children}</div>
    </>
  );
}

export function PopoverBar({
  icon,
  children,
  className = "",
  popClassName = "",
  id = "",
  iconClassName = "",
}) {
  const css = `relative ${className}`;
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className={css}>
        <button
          type="button"
          onClick={() => {
            setOpen(!open);
          }}
          className={`h-8 w-8 ${iconClassName}`}
        >
          {icon}
        </button>

        <Popover open={open} className="">
          {children}
        </Popover>
      </div>
    </>
  );
}
