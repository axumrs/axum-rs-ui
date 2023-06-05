import React from "react";
import PageMeta from "../components/PageMeta";
import PageTitle from "../components/PageTitle";
import Card from "../components/Card";

export default function About() {
  return (
    <>
      <PageMeta>关于我们</PageMeta>
      <PageTitle>关于我们</PageTitle>
      <Card className="mx-3 my-3 lg:mx-0">
        <div className="prose max-w-none lg:prose-xl p-3 lg:p-6">
          <p>
            AXUM 中文网(<a href="http://axum.rs">axum.rs</a>)为你提供了使用 axum
            进行企业级 Web
            开发中所需要的大部分知识。从基础知识到企业级项目的开发，都有完整的系列教程。更难得的是，除了文字教程，我们还录制了配套的视频教程，方便你以多种形式进行学习。
          </p>
          <h2>技术栈</h2>
          <p>本站使用了大量的开源、免费项目，对这些项目表示感谢。</p>
          <h3>后端</h3>
          <ul>
            <li>
              <p>
                <a href="https://rust-lang.org">Rust</a>
              </p>
            </li>
            <li>
              <p>
                <a href="https://github.com/tokio-rs/axum">AXUM</a>
              </p>
            </li>
            <li>
              <p>
                <a href="https://mysql.com">MySQL</a>
              </p>
            </li>
            <li>
              <p>
                <a href="https://redis.io">Redis</a>
              </p>
            </li>
          </ul>
          <blockquote>
            <p>
              更多依赖请参见{" "}
              <a href="https://github.com/axumrs/axum-rs/blob/main/Cargo.toml">
                <code>Cargo.toml</code>
              </a>{" "}
              文件
            </p>
          </blockquote>
          <h3>前台 UI</h3>
          <ul>
            <li>
              <p>
                <a href="https://reactjs.org">React</a>
              </p>
            </li>
            <li>
              <p>
                <a href="https://nextjs.org">Next.js</a>
              </p>
            </li>
            <li>
              <p>
                <a href="https://tailwindcss.com">Tailwind CSS</a>
              </p>
            </li>
          </ul>
          <blockquote>
            <p>
              更多依赖请参见{" "}
              <a href="https://github.com/axumrs/axum-rs-ui/blob/main/package.json">
                <code>package.json</code>
              </a>{" "}
              文件
            </p>
          </blockquote>
          <h3>后台 UI</h3>
          <ul>
            <li>
              <p>
                <a href="https://reactjs.org">React</a>
              </p>
            </li>
            <li>
              <p>
                <a href="https://ant.design/">Antd</a>
              </p>
            </li>
          </ul>
          <blockquote>
            <p>
              更多依赖请参见{" "}
              <a href="https://github.com/axumrs/axum-rs-admin-ui/blob/main/package.json">
                <code>package.json</code>
              </a>{" "}
              文件
            </p>
          </blockquote>
          <h3>素材</h3>
          <ul>
            <li>
              <a href="https://github.com/devicons/devicon">DevIcon</a>
            </li>
          </ul>
          <h2>开源</h2>
          <ul>
            <li>
              <p>
                <a href="https://github.com/axumrs/axum-rs">后端</a>
              </p>
            </li>
            <li>
              <p>
                <a href="https://github.com/axumrs/axum-rs-ui">前台 UI</a>
              </p>
            </li>
            <li>
              <p>
                <a href="https://github.com/axumrs/axum-rs-admin-ui">后台 UI</a>
              </p>
            </li>
          </ul>
          <h2>联系我们</h2>
          <ul>
            <li>
              <p>
                电子邮件：
                <a href="mailto:team@axum.rs">
                  <code>team@axum.rs</code>
                </a>
              </p>
            </li>
            <li>
              <p>
                TG 群：
                <a href="https://t.me/axumrs">
                  <code>t.me/axumrs</code>
                </a>
              </p>
            </li>
          </ul>
          <h2>捐助</h2>
          <ul>
            <li>
              USDT / TRX：<code>TPGEtKJmPJU3naosCcRrVReE2ckFhE9sYM</code>
            </li>
          </ul>
        </div>
      </Card>
    </>
  );
}
