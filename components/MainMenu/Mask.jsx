import React from "react";

export default function Mask({ open = false }) {
  return (
    <div
      className={`${
        open ? "block" : "hidden"
      } fixed w-screen h-screen inset-0 bg-black/50 z-10 md:hidden md:z-0`}
    ></div>
  );
}
