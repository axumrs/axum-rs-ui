import Head from "next/head";
import React from "react";

export default function PageMeta({ children, keyword, description }) {
  return (
    <Head>
      <meta
        name="description"
        content={fillMeta(
          description,
          "AXUM中文网为你提供了企业级axum Web开发中所需要的大部分知识。从基础知识到企业级项目的开发，都有完整的系列教程。更难得的是，除了文字教程，我们还录制了配套的视频教程，方便你以多种形式进行学习。",
          "。"
        )}
      />
      <meta
        name="keyword"
        content={fillMeta(keyword, "axum,企业开发,教程,视频教程,axum.rs", ",")}
      />
      <title>
        {fillMeta(
          children,
          "AXUM中文网 - 带你使用 axum 构建企业应用 - axum.rs",
          " - "
        )}
      </title>
    </Head>
  );
}

function fillMeta(data, base, sep) {
  const filledData = data ? `${data}${sep}` : "";
  return `${filledData}${base}`;
}
