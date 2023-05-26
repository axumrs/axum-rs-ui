import React from "react";
import Link from "next/link";

export default function MoreButton({
  href = "",
  children,
  className = "",
  isBtn = false,
  onClick = () => {},
  ...other
}) {
  const css = `py-1 px-3 border border-blue-500 text-blue-600 rounded-full text-sm hover:text-blue-700 hover:bg-gray-50 ${className}`;
  if (isBtn) {
    return (
      <button type="button" onClick={onClick} className={css}>
        {children}
      </button>
    );
  }
  return (
    <Link href={href} className={css} {...other}>
      {children}
    </Link>
  );
}
