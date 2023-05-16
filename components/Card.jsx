import React from "react";

export default function Card({ children, className = "", ...other }) {
  return (
    <div className={`border rounded-md bg-white p-3 ${className}`} {...other}>
      {children}
    </div>
  );
}
