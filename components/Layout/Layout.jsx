import React from "react";
import MainMenu from "../MainMenu";
import Navbar from "../Navbar";

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <div className="axum-rs-container grid grid-cols-1 gap-0 lg:grid-cols-12 lg:gap-1">
        <aside className="lg:col-span-2">
          <MainMenu className="" />
        </aside>
        <main className="col-span-full lg:col-span-10">{children}</main>
      </div>
    </>
  );
}
