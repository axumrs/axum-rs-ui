export default function use$seo() {
  const seoTitle = (title: string = "") =>
    useSeoMeta({
      title: `${
        title ? `${title} - ` : ""
      }AXUM中文网 - 带你使用 axum 构建企业应用 - axum.rs`,
    });
  const pageMeta = (description: string = "", keywords: string = "") =>
    useHead({
      meta: [
        {
          name: "description",
          content: `${description}AXUM中文网为你提供了企业级axum Web开发中所需要的大部分知识。从基础知识到企业级项目的开发，都有完整的系列教程。更难得的是，除了文字教程，我们还录制了配套的视频教程，方便你以多种形式进行学习。`,
        },
        {
          name: "keywords",
          content: `${
            keywords ? `${keywords},` : ""
          }axum,企业开发,教程,视频教程,axum.rs`,
        },
      ],
      link: [
        {
          rel: "icon",
          type: "image/png",
          href: "https://file.axum.rs/asset/logo.png",
        },
      ],
    });

  return { seoTitle, pageMeta };
}
