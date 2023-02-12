import React from "react";
import BgVideo from "../BgVideo";
import Navbar from "../Navbar";

export default function SinLayout(page, enableBgVideo = true) {
  return (
    <>
      {enableBgVideo ? <BgVideo /> : <></>}
      <Navbar />
      <div className="axum-rs-container relative h-full">{page}</div>
    </>
  );
}
