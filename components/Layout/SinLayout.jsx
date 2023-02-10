import React from "react";
import Navbar from "../Navbar";

export default function SinLayout(page) {
  return (
    <>
      <Navbar />
      <div className="axum-rs-container bg-blue-100">{page}</div>
    </>
  );
}
