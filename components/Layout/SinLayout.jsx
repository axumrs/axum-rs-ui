import React from "react";
import BgVideo from "../BgVideo";
import Navbar from "../Navbar";

export default function SinLayout(page) {
  return (
    <>
      <Navbar />
      <div className="axum-rs-container ">{page}</div>
      <BgVideo />
    </>
  );
}
