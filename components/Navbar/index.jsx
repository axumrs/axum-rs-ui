import React from "react";
import Link from "next/link";
import NavItem from "./NavItem";
export default function Navbar() {
  return (
    <header className="bg-gray-50 shadow p-3">
      <nav className="axum-rs-container flex justify-between space-x-4">
        <Link href="/" className="flex">
          <img
            src="https://file.axum.rs/asset/logo.png"
            alt="AXUM.RS"
            className="w-6 h-6 object-cover"
          />
          <h2>AXUM.RS</h2>
        </Link>

        <form></form>

        <ul className="flex">
          <NavItem href="/">首页</NavItem>
          <NavItem href="/">专题</NavItem>
          <NavItem href="/">文章</NavItem>
        </ul>

        <ul className="flex">
          <NavItem href="/">登录</NavItem>
          <NavItem href="/">注册</NavItem>
        </ul>
      </nav>
    </header>
  );
}
