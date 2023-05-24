import React from "react";

export default function Mask({ open = false, onClick = () => {} }) {
  return (
    <div
      className={`${
        open ? "block" : "hidden"
      } fixed w-screen h-screen inset-0 bg-black/50 z-10 lg:hidden lg:z-0`}
      onClick={onClick}
    ></div>
  );
}
