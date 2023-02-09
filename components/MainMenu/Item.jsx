import React from "react";

export default function Item({ children, href = "", icon }) {
  return (
    <li>
      <a href={href}>
        <div className="text-red-500">{icon}</div>
        {children}
      </a>
    </li>
  );
}
