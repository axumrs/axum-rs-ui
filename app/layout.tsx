import "./globals.css";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import { AxumrsCookieProvider } from "@/contexts/AxumrsCookieProvider";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "AXUM中文网",
  description:
    "AXUM中文网为你提供了企业级axum Web开发中所需要的大部分知识。从基础知识到企业级项目的开发，都有完整的系列教程。更难得的是，除了文字教程，我们还录制了配套的视频教程，方便你以多种形式进行学习。",
};

export default function RootLayout({ children }: ChildrenProps) {
  return (
    <html lang="zh-Hans">
      <body>
        <AxumrsCookieProvider value={cookies().getAll()}>
          <Header />
          <div>{children}</div>
        </AxumrsCookieProvider>
      </body>
    </html>
  );
}
