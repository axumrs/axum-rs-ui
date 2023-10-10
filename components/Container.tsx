import React from "react";

export default function Container({
  children,
  className = "",
}: ComponentProps) {
  return <div className={`container mx-auto ${className}`}>{children}</div>;
}
