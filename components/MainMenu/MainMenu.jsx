import React from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Item from "./Item";
import Mask from "./Mask";

export default function MainMenu({ className }) {
  const fullClassName = `fixed left-0 top-0 bg-white w-3/4 h-screen  z-20 shadow-md md:static md:bg-transparent md:z-auto md:shadow-none ${className}`;
  return (
    <>
      <Mask />
      <div className={fullClassName}>
        <div className="flex flex-col space-y-3 relative mt-14 md:mt-0 ">
          <ul>
            <Item icon={<MagnifyingGlassIcon />}>什么鬼</Item>
          </ul>
          <div>footer</div>
        </div>
      </div>
    </>
  );
}
