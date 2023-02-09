import React from "react";
import Link from "next/link";
import { Bars3Icon } from "@heroicons/react/24/outline";

import User from "./User";
import SearchBar from "./SearchBar";
import Writer from "./Writer";

export default function Navbar() {
  return (
    <header className="bg-white shadow px-3 py-3 md:py-3">
      <nav className="axum-rs-container grid grid-cols-12 items-center gap-x-1 md:gap-x-4">
        <button className="block col-start-1  md:hidden md:col-auto ">
          <Bars3Icon className="w-6 h-6" />
        </button>

        <Link
          href="/"
          className="col-start-2 col-span-2 flex justify-start items-center space-x-1 ml-3 z-30 md:col-start-1 md:ml-0 md:z-auto"
        >
          <img
            src="https://file.axum.rs/asset/logo.png"
            alt="AXUM.RS"
            className="w-6 h-6 object-cover"
          />
          <h2 className="text-lg">AXUM.RS</h2>
        </Link>

        <SearchBar className="md:col-span-8" />
        <div className="col-start-10 col-span-3  flex justify-center items-center space-x-3 md:col-start-11 md:col-span-2">
          <Writer />

          <User className=" flex flex-col justify-start items-center" />
        </div>
      </nav>
    </header>
  );
}
