import React from "react";

export default function BgVideo({ src = "https://file.axum.rs/asset/bg.mp4" }) {
  return (
    <div className="fixed top-0 left-0 h-full w-full -z-10 opacity-[0.15] overflow-hidden">
      <video autoPlay loop muted className="w-full h-full object-cover">
        <source src={src} type="video/mp4" />
      </video>
    </div>
  );
}
