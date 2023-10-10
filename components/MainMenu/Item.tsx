"use client";
import Link from "next/link";
import React from "react";

export default function Item({
  children,
  href = "",
  icon = <></>,
  isRelative = false,
  isGroup = false,
  isWidest = false,
  ext = <></>,
  isButton = false,
}: ChildrenProps & {
  href?: string;
  icon?: React.ReactNode;
  isRelative?: boolean;
  isGroup?: boolean;
  isWidest?: boolean;
  ext?: React.ReactNode;
  isButton?: boolean;
}) {
  return (
    <li
      className={`px-6 py-2 text-gray-800 hover:bg-gray-200/70 ${
        isRelative ? "relative" : ""
      } ${isGroup ? "group" : ""}`}
    >
      <_Item href={href} isButton={isButton}>
        <span className="w-6 h-6">{icon}</span>
        <span
          className={`text-lg font-normal ${
            isWidest ? "tracking-widest" : ""
          } xl:tracking-widest`}
        >
          {children}
        </span>
      </_Item>
      {ext}
    </li>
  );
}

function _Item({
  children,
  className = "",
  isButton = false,
  href = "",
  onClick = () => {},
}: ComponentProps & {
  isButton?: boolean;
  href?: string;
  onClick?: () => void;
}) {
  const css = `flex justify-start items-center space-x-3 ${className}`;
  if (isButton) {
    return (
      <button type="button" onClick={onClick} className={css}>
        {children}
      </button>
    );
  }

  return (
    <Link href={href} className={css} onClick={() => {}}>
      {children}
    </Link>
  );
}
