import React from "react";
import "../globals.css";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Container from "@/components/Container";

export const metadata: Metadata = {
  title: "AXUM中文网 - 带你使用 axum 构建企业应用 - axum.rs",
  description:
    "AXUM中文网为你提供了企业级axum Web开发中所需要的大部分知识。从基础知识到企业级项目的开发，都有完整的系列教程。更难得的是，除了文字教程，我们还录制了配套的视频教程，方便你以多种形式进行学习。",
  keywords: "axum,企业开发,教程,视频教程,axum.rs",
};

export default function AuthLayout({ children }: ChildrenProps) {
  return (
    <html lang="zh-Hans">
      <body>
        <Header />
        <Container className="">
          <main className="">{children}</main>
        </Container>
      </body>
    </html>
  );
}
