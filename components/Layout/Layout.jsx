import React from "react";
import BgVideo from "../BgVideo";
import MainMenu from "../MainMenu";
import Navbar from "../Navbar";
import { useMainMenuContext } from "../../contexts/MainMenuContext";

export default function Layout({ children, enableBgVideo = true }) {
  const { open } = useMainMenuContext();
  return (
    <>
      {enableBgVideo ? <BgVideo /> : <></>}
      <Navbar />
      <div className="axum-rs-container grid grid-cols-1 gap-0 lg:grid-cols-12 lg:gap-3">
        <aside className="lg:col-span-2">
          <MainMenu className="" open={open} />
        </aside>
        <main className="col-span-full lg:col-span-10 mt-6">{children}</main>
      </div>
    </>
  );
}
