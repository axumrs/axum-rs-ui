import React from "react";

export default function PageTitle({ children }) {
  return (
    <h2 className="text-lg mb-3 font-bold ml-3 lg:text-xl lg:font-extrabold lg:ml-0">
      {children}
    </h2>
  );
}
