import "../globals.css";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import { AxumrsCookieProvider } from "@/contexts/AxumrsCookieProvider";
import Header from "@/components/Header";
import Container from "@/components/Container";
import MainMenu from "@/components/MainMenu";
import { MainMenuContextProvider } from "@/contexts/MainMenuContext";

export const metadata: Metadata = {
  title: "AXUM中文网 - 带你使用 axum 构建企业应用 - axum.rs",
  description:
    "AXUM中文网为你提供了企业级axum Web开发中所需要的大部分知识。从基础知识到企业级项目的开发，都有完整的系列教程。更难得的是，除了文字教程，我们还录制了配套的视频教程，方便你以多种形式进行学习。",
  keywords: "axum,企业开发,教程,视频教程,axum.rs",
};

export default function RootLayout({ children }: ChildrenProps) {
  return (
    <html lang="zh-Hans">
      <body>
        <AxumrsCookieProvider value={cookies().getAll()}>
          <MainMenuContextProvider value={false}>
            <Header />
            <Container className="grid grid-cols-1 gap-0 lg:grid-cols-12 lg:gap-3">
              <aside className="lg:col-span-2">
                <MainMenu className="" />
              </aside>
              <main className="col-span-full lg:col-span-10 mt-6">
                {children}
              </main>
            </Container>
          </MainMenuContextProvider>
        </AxumrsCookieProvider>
      </body>
    </html>
  );
}
