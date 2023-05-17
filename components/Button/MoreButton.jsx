import React from "react";
import Link from "next/link";

export default function MoreButton({
  href = "",
  children,
  className = "",
  ...other
}) {
  return (
    <Link
      href={href}
      className={`py-1 px-3 border border-blue-500 text-blue-600 rounded-full text-sm hover:text-blue-700 hover:bg-gray-50 ${className}`}
      {...other}
    >
      {children}
    </Link>
  );
}
