import React from "react";
import Card from "../../../components/Card";
import PageMeta from "../../../components/PageMeta";
import Link from "next/link";
import {
  NewspaperIcon,
  EyeIcon,
  CalendarDaysIcon,
  TagIcon,
} from "@heroicons/react/24/outline";

export default function TopicDetail() {
  return (
    <>
      <PageMeta>
        React: SEO挑战、服务端渲染及本地存储 - 全栈：AXUM、React、NextJS 和
        TailWindCSS
      </PageMeta>

      <div className="mb-3">
        <img
          src="https://cdn.hashnode.com/res/hashnode/image/upload/v1684170814296/50fd7774-8684-45b1-ab70-6e5f82707b3f.png?w=1600&h=840&fit=crop&crop=entropy&auto=compress,format&format=webp"
          className="w-full object-cover rounded-md border"
        />
      </div>

      <Card className="">
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-xl font-bold lg:text-3xl lg:font-extrabold">
            React: SEO挑战、服务端渲染及本地存储
          </h1>
          <div className="flex justify-start items-center text-gray-600 text-sm space-x-1 my-3">
            <span>
              <NewspaperIcon className="w-4 h-4" />
            </span>
            <Link
              href={`/subject/1`}
              className="hover:underline hover:decoration-dotted hover:text-gray-700"
            >
              全栈：AXUM、React、NextJS 和 TailWindCSS
            </Link>
          </div>
          <div className="flex justify-start items-center text-gray-500 text-xs space-x-2">
            <div className="flex justify-start items-center space-x-1">
              <span>
                <EyeIcon className="w-4 h-4" />
              </span>
              <span>123456</span>
            </div>
            <div className="flex justify-start items-center space-x-1">
              <span>
                <CalendarDaysIcon className="w-4 h-4" />
              </span>
              <span>2023-05-17 14:03:32</span>
            </div>
          </div>
          <div className="flex justify-start items-center text-gray-500 text-xs space-x-1 mt-3">
            <span>
              <TagIcon className="w-4 h-4" />
            </span>
            <Link
              className="before:content-['#'] hover:underline hover:decoration-dashed"
              href={`/tag/1`}
            >
              标签1
            </Link>
            <Link
              className="before:content-['#'] hover:underline hover:decoration-dashed"
              href={`/tag/1`}
            >
              标签1
            </Link>
            <Link
              className="before:content-['#'] hover:underline hover:decoration-dashed"
              href={`/tag/1`}
            >
              标签1
            </Link>
            <Link
              className="before:content-['#'] hover:underline hover:decoration-dashed"
              href={`/tag/1`}
            >
              标签1
            </Link>
            <Link
              className="before:content-['#'] hover:underline hover:decoration-dashed"
              href={`/tag/1`}
            >
              标签1
            </Link>
          </div>
        </div>
      </Card>

      <Card className="my-3">
        <div
          dangerouslySetInnerHTML={{ __html: testContent() }}
          className="prose lg:prose-xl max-w-none"
        ></div>
      </Card>
    </>
  );
}

function testContent() {
  return `
<p>经过紧张的学习，React 课程终于暂告一个段落了。本章将是一个相对轻松的内容，我们一起探讨一下 React 应用的 SEO 以及为什么需要服务端渲染，同时对 React 课程做个简单的小结。</p>
<h2>为什么说 SEO 是 React 应用的最大挑战</h2>
<p>我们来做个实验：将本课程 React 课程第一章最后使用 vite 生成的 React 进行构建，然后看一下构建后的内容。先来看一下我们的源码怎么写的：</p>
<pre id="procted_content_f815711f36104617be9278602ec104eb" style="border: 0px solid rgb(23, 162, 184);" class="hljs language-javascript"><span class="hljs-keyword">import</span> <span class="hljs-title class_">React</span> <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;

<span class="hljs-keyword">function</span> <span class="hljs-title function_">App</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>你好，axum中文网 - 来自 react 的问候<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span></span>;
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-title class_">App</span>;
</pre><div id="captcha-notice-f815711f36104617be9278602ec104eb" class="captcha-notice callout callout-info" style="display: none;">
</div>
<p>非常非常简单，就一行硬编码进去的文字。现在，让我们构建它：</p>
<pre><code class="language-bash hljs">yarn build
</code></pre>
<p>构建好之后，会将目标文件放在 <code>dist</code> 目录下。打开 <code>dist/index.html</code>，这是构建好的最终的 HTML 文件：</p>
<pre><code class="language-html hljs language-xml"><span class="hljs-meta">&lt;!DOCTYPE <span class="hljs-keyword">html</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span> /&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"icon"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"image/svg+xml"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"/vite.svg"</span> /&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"viewport"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"width=device-width, initial-scale=1.0"</span> /&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Vite + React<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"module"</span> <span class="hljs-attr">crossorigin</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"/assets/index.7b12dfb4.js"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"root"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    
  <span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span>
</code></pre>
<p>握了个大草，依然只有一个 <code>&lt;div id="root"&gt;&lt;/div&gt;</code>。我们在组件里写的那个 <code>&lt;h1&gt;你好，axum中文网 - 来自 react 的问候&lt;/h1&gt;</code> 跑去哪里了？</p>
<p>你会看到，在这个 HTML 里有一行引入 JS 代码的标签：<code>&lt;script type="module" crossorigin src="/assets/index.7b12dfb4.js"&gt;&lt;/script&gt;</code> ，是的，我们写的组件（包括本例这种硬编码进去的文本内容）全部被打包进了 JS 文件里。</p>
<p>原因也很简单，我们是用 JSX 来开发组件的，JSX 的本质是 <code>React.createElement()</code>语法糖， 这是一个由 React 提供的 Javascript 函数，自然我们开发的组件全被视为对 <code>React.createElement()</code> 调用的 Javascript 代码了。</p>
<p>HTML 里空空如也，内容和数据全跑到 JS 里去了，这是对 SEO 最大的挑战——几乎不要奢望SEO了。</p>
<p>本节代码：<a href="https://stackblitz.com/edit/vitejs-vite-zwff7e?file=src%2FApp.jsx,dist%2Findex.html" target="_blank">axum-rs-react-no-seo</a></p>
<h2>服务端渲染(Server-Side Rendering)</h2>
<blockquote>
<p id="procted_content_5663895542304587a1b37603aa25ebad" style="border: 0px solid rgb(23, 162, 184);">由于它的缩写过于敏感，为防止被误杀，本站将一直使用「服务端渲染」而不用它的三字母缩写</p><div id="captcha-notice-5663895542304587a1b37603aa25ebad" class="captcha-notice callout callout-info" style="display: none;">
</div>
</blockquote>
<p>有没有可能把组件直接渲染成普通的HTML标签，以利于SEO？可以的，服务端渲染就行，而且 React 官方就提供了相应的功能。下面代码是我们一直在用的，一个典型的 React 入口文件：</p>
<pre><code class="language-jsx hljs language-javascript"><span class="hljs-keyword">import</span> <span class="hljs-title class_">React</span> <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>
<span class="hljs-keyword">import</span> <span class="hljs-title class_">React</span>DOM <span class="hljs-keyword">from</span> <span class="hljs-string">'react-dom/client'</span>
<span class="hljs-keyword">import</span> <span class="hljs-title class_">App</span> <span class="hljs-keyword">from</span> <span class="hljs-string">'./App'</span>
<span class="hljs-keyword">import</span> <span class="hljs-string">'./index.css'</span>

<span class="hljs-title class_">React</span>DOM.<span class="hljs-title function_">createRoot</span>(<span class="hljs-variable language_">document</span>.<span class="hljs-title function_">getElementById</span>(<span class="hljs-string">'root'</span>)).<span class="hljs-title function_">render</span>(
  <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">React.StrictMode</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">App</span> /&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">React.StrictMode</span>&gt;</span></span>
)
</code></pre>
<p>第2行：<code>import ReactDOM from 'react-dom/client'</code>，我们是从 <code>react-dom/client</code> 导入的 <code>ReactDOM</code></p>
<ul>
<li>大胆猜测，是不是还有 <code>react-dom/server</code>？</li>
<li>小心求证：是的。官方文档在<a href="https://zh-hans.reactjs.org/docs/react-dom-server.html" target="_blank">这里</a></li>
</ul>
<p>本课程不使用 React 提供的服务端渲染，而是使用 NextJS 来更灵活的处理各种渲染模式。</p>
<h2>惊天大BUG！我要上报给官方，少说能拿个几万美刀！</h2>
<p>一位不愿透露姓名的学员（毕竟要为几万美刀的安全负责）表示，他使用 Context 制作了用户登录，但按F5刷新网页之后，又变成未登录了。这是一个BUG，上报给官方少说能拿几万美刀——他肆意地遐想着。</p>
<p>同学，醒醒！你缺的不仅仅是美刀，更是缺少对基础知识的理解！</p>
<p>我们知道，我们开发的组件其实是作为虚拟DOM存在的，由 React 决定什么时候、以什么方式转换成真实 DOM 并渲染到页面上。虚拟 DOM 是保存在内存里的，所以每次刷新页面都会导致组件重走一次生命周期——就是说，每次刷新页面，你看到的其实是不同的实例。连组件都重新走一遍整个生命周期了，你觉得由它维护的 <code>state</code>、<code>props</code> 不会丢失吗？</p>
<p>要避免这位同学遇到的问题，那就需要将那些数据进行持久化。</p>
<h2>前端数据的持久化</h2>
<p id="procted_content_8e747f84f0254e0fabaa6b70242cd80f" style="border: 0px solid rgb(23, 162, 184);">在后端，我们有很多种途径对数据进行持久化：写入到文件、保存到数据库等等。而在前端，我们可以利用 HTML 5 提供的 <a href="https://developer.mozilla.org/zh-CN/docs/Web/API/Storage"><code>Storage</code></a> API实现。</p><div id="captcha-notice-8e747f84f0254e0fabaa6b70242cd80f" class="captcha-notice callout callout-info" style="display: none;">
</div>
<p>有两种 <code>Storage</code>：</p>
<ul>
<li><a href="https://developer.mozilla.org/zh-CN/docs/Web/API/Window/localStorage" target="_blank"><code>localStorage</code></a>：本地存储</li>
<li><a href="https://developer.mozilla.org/zh-CN/docs/Web/API/Window/sessionStorage" target="_blank"><code>sessionStorage</code></a>：会话存储</li>
</ul>
<p>它们提供的 API 一样，只是存储数据的持续时间不同。会话存储基本上就是关闭浏览器，数据就会自动被清除；而本地存储则是，除非手动删除，否则它一直都在。</p>
<p>上面给出的文档链接里有示例代码，我们来看一下：</p>
<pre><code class="language-js hljs language-javascript"><span class="hljs-comment">// 保存数据到 sessionStorage</span>
sessionStorage.<span class="hljs-title function_">setItem</span>(<span class="hljs-string">'key'</span>, <span class="hljs-string">'value'</span>);

<span class="hljs-comment">// 从 sessionStorage 获取数据</span>
<span class="hljs-keyword">let</span> data = sessionStorage.<span class="hljs-title function_">getItem</span>(<span class="hljs-string">'key'</span>);

<span class="hljs-comment">// 从 sessionStorage 删除保存的数据</span>
sessionStorage.<span class="hljs-title function_">removeItem</span>(<span class="hljs-string">'key'</span>);

<span class="hljs-comment">// 从 sessionStorage 删除所有保存的数据</span>
sessionStorage.<span class="hljs-title function_">clear</span>();
</code></pre>
<blockquote>
<p>再说一遍，它们的API是一样的，把上面代码中的 <code>sessionStorage</code> 改成 <code>localStorage</code> 就是本地存储</p>
</blockquote>
<h2>本地存储的 React hook</h2>
<h3>定义一个 hook</h3>
<pre><code class="language-jsx hljs language-javascript"><span class="hljs-keyword">function</span> <span class="hljs-title function_">useLocalStorage</span>(<span class="hljs-params">key, initialValue</span>) {
  <span class="hljs-comment">// State to store our value</span>
  <span class="hljs-comment">// Pass initial state function to useState so logic is only executed once</span>
  <span class="hljs-keyword">const</span> [storedValue, setStoredValue] = <span class="hljs-title function_">useState</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> <span class="hljs-variable language_">window</span> === <span class="hljs-string">"undefined"</span>) {
      <span class="hljs-keyword">return</span> initialValue;
    }

    <span class="hljs-keyword">try</span> {
      <span class="hljs-comment">// Get from local storage by key</span>
      <span class="hljs-keyword">const</span> item = <span class="hljs-variable language_">window</span>.<span class="hljs-property">localStorage</span>.<span class="hljs-title function_">getItem</span>(key);
      <span class="hljs-comment">// Parse stored json or if none return initialValue</span>
      <span class="hljs-keyword">return</span> item ? <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">parse</span>(item) : initialValue;
    } <span class="hljs-keyword">catch</span> (error) {
      <span class="hljs-comment">// If error also return initialValue</span>
      <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(error);
      <span class="hljs-keyword">return</span> initialValue;
    }
  });

  <span class="hljs-comment">// Return a wrapped version of useState's setter function that ...</span>
  <span class="hljs-comment">// ... persists the new value to localStorage.</span>
  <span class="hljs-keyword">const</span> <span class="hljs-title function_">setValue</span> = (<span class="hljs-params">value</span>) =&gt; {
    <span class="hljs-keyword">try</span> {
      <span class="hljs-comment">// Allow value to be a function so we have same API as useState</span>
      <span class="hljs-keyword">const</span> valueToStore =
        value <span class="hljs-keyword">instanceof</span> <span class="hljs-title class_">Function</span> ? <span class="hljs-title function_">value</span>(storedValue) : value;
      <span class="hljs-comment">// Save state</span>
      <span class="hljs-title function_">setStoredValue</span>(valueToStore);
      <span class="hljs-comment">// Save to local storage</span>
      <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> <span class="hljs-variable language_">window</span> !== <span class="hljs-string">"undefined"</span>) {
        <span class="hljs-variable language_">window</span>.<span class="hljs-property">localStorage</span>.<span class="hljs-title function_">setItem</span>(key, <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>(valueToStore));
      }
    } <span class="hljs-keyword">catch</span> (error) {
      <span class="hljs-comment">// A more advanced implementation would handle the error case</span>
      <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(error);
    }
  };

  <span class="hljs-keyword">return</span> [storedValue, setValue];
}
</code></pre>
<h3>使用 hook</h3>
<pre><code class="language-jsx hljs language-javascript"><span class="hljs-keyword">function</span> <span class="hljs-title function_">App</span>(<span class="hljs-params"></span>) {
  <span class="hljs-comment">// Similar to useState but first arg is key to the value in local storage.</span>
  <span class="hljs-keyword">const</span> [name, setName] = <span class="hljs-title function_">useLocalStorage</span>(<span class="hljs-string">"name"</span>, <span class="hljs-string">"Bob"</span>);

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">input</span>
        <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span>
        <span class="hljs-attr">placeholder</span>=<span class="hljs-string">"Enter your name"</span>
        <span class="hljs-attr">value</span>=<span class="hljs-string">{name}</span>
        <span class="hljs-attr">onChange</span>=<span class="hljs-string">{(e)</span> =&gt;</span> setName(e.target.value)}
      /&gt;
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<blockquote>
<p>以上代码来自<a href="https://usehooks.com/useLocalStorage/" target="_blank">这里</a></p>
</blockquote>
<p>你可以根据自己的需求把上面的 hook 进行优先、扩展，以期与你的需求更加契合。</p>
<p>是时候撒花了，恭喜你完成了我们这个专题的第一个子专题。下一章我们将开始 NextJS 的学习，准备好了吗？</p>
`;
}
