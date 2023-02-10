import React from "react";
import Link from "next/link";
import { Bars3Icon } from "@heroicons/react/24/outline";

import User from "./User";
import SearchBar from "./SearchBar";
import Writer from "./Writer";

export default function Navbar() {
  return (
    <header className="bg-white shadow px-3 py-3 lg:py-3">
      <nav className="axum-rs-container grid grid-cols-12 items-center gap-x-1 lg:gap-x-4">
        <button className="block col-start-1  lg:hidden lg:col-auto ">
          <Bars3Icon className="w-6 h-6" />
        </button>

        <Link
          href="/"
          className="col-start-2 col-span-6 flex justify-start items-center space-x-1 ml-3 z-30 lg:col-start-1 lg:ml-0 lg:z-auto lg:col-span-2"
        >
          <img
            src="https://file.axum.rs/asset/logo.png"
            alt="AXUM.RS"
            className="w-6 h-6 object-cover"
          />
          <h2 className="text-lg">AXUM中文网</h2>
        </Link>

        <SearchBar className="lg:col-span-8" />
        <div className="col-start-10 col-span-3  flex justify-center items-center space-x-3 lg:col-start-11 lg:col-span-2">
          <Writer />

          <User className=" flex flex-col justify-start items-center" />
        </div>
      </nav>
    </header>
  );
}
