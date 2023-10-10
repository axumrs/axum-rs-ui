"use client";

import React from "react";
import Container from "../Container";
import Link from "next/link";
import SearchBar from "./SearchBar";
import User from "./User";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { HomeIcon } from "@heroicons/react/24/solid";
import { useMainMenuContext } from "@/contexts/useMainMenuContext";

export default function Header({
  showBarButton = true,
}: {
  showBarButton?: boolean;
}) {
  const { toggle } = useMainMenuContext();

  return (
    <header className="bg-white shadow px-3 py-3 lg:py-3">
      <Container>
        <nav className="grid grid-cols-12 items-center gap-x-1 lg:gap-x-4">
          {/* toggle */}
          <div className="col-start-1">
            {showBarButton ? (
              <button
                className="block col-start-1  lg:hidden lg:col-auto "
                onClick={() => {
                  toggle();
                }}
              >
                <Bars3Icon className="w-6 h-6" />
              </button>
            ) : (
              <Link href="/" className=" text-gray-600  lg:hidden lg:col-auto ">
                <HomeIcon className="w-6 h-6" />
              </Link>
            )}
          </div>
          {/* logo */}
          <div className="col-start-2 col-span-6  ml-3 z-30  lg:ml-0 lg:z-auto lg:col-start-1 lg:col-span-2">
            <Link
              href="/"
              className="flex justify-start items-center space-x-1 "
            >
              <img
                src="https://file.axum.rs/asset/logo.png"
                className="w-6 object-cover"
                alt="AXUM中文网"
              />
              <h2 className="text-lg">AXUM中文网</h2>
            </Link>
          </div>

          {/* search bar */}
          <div className="lg:col-span-8">
            <SearchBar />
          </div>

          {/* use actions */}
          <div className="col-start-10 col-span-3  flex justify-center items-center lg:space-x-3 lg:col-start-11 lg:col-span-2">
            <User />
          </div>
        </nav>
      </Container>
    </header>
  );
}
