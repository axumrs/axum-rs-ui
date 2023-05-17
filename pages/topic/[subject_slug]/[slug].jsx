import React, { useEffect } from "react";
import Card from "../../../components/Card";
import PageMeta from "../../../components/PageMeta";
import Link from "next/link";
import {
  NewspaperIcon,
  EyeIcon,
  CalendarDaysIcon,
  TagIcon,
} from "@heroicons/react/24/outline";
import "highlight.js/styles/github.css";
import hljs from "highlight.js";

export default function TopicDetail() {
  useEffect(() => {
    hljs.highlightAll();
  }, []);

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
          className="prose max-w-none lg:prose-xl"
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
<div class="g-recaptcha" data-sitekey="6Le2lekhAAAAACaNccDRG9Ve-nEP5tTyF_Jzp-tD" data-callback="get_procted_content_recaptcha" data-size="invisible" id="hcaptcha-f815711f36104617be9278602ec104eb"></div><div id="captcha-notice-f815711f36104617be9278602ec104eb" class="captcha-notice callout callout-info">
</div>
<p>非常非常简单，就一行硬编码进去的文字。现在，让我们构建它：</p>
<pre><code class="language-bash">yarn build
</code></pre>
<p>构建好之后，会将目标文件放在 <code>dist</code> 目录下。打开 <code>dist/index.html</code>，这是构建好的最终的 HTML 文件：</p>
<pre><code class="language-html">&lt;!DOCTYPE html&gt;
&lt;html lang=&quot;en&quot;&gt;
  &lt;head&gt;
    &lt;meta charset=&quot;UTF-8&quot; /&gt;
    &lt;link rel=&quot;icon&quot; type=&quot;image/svg+xml&quot; href=&quot;/vite.svg&quot; /&gt;
    &lt;meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1.0&quot; /&gt;
    &lt;title&gt;Vite + React&lt;/title&gt;
    &lt;script type=&quot;module&quot; crossorigin src=&quot;/assets/index.7b12dfb4.js&quot;&gt;&lt;/script&gt;
  &lt;/head&gt;
  &lt;body&gt;
    &lt;div id=&quot;root&quot;&gt;&lt;/div&gt;
    
  &lt;/body&gt;
&lt;/html&gt;
</code></pre>
<p>握了个大草，依然只有一个 <code>&lt;div id=&quot;root&quot;&gt;&lt;/div&gt;</code>。我们在组件里写的那个 <code>&lt;h1&gt;你好，axum中文网 - 来自 react 的问候&lt;/h1&gt;</code> 跑去哪里了？</p>
<p>你会看到，在这个 HTML 里有一行引入 JS 代码的标签：<code>&lt;script type=&quot;module&quot; crossorigin src=&quot;/assets/index.7b12dfb4.js&quot;&gt;&lt;/script&gt;</code> ，是的，我们写的组件（包括本例这种硬编码进去的文本内容）全部被打包进了 JS 文件里。</p>
<p>原因也很简单，我们是用 JSX 来开发组件的，JSX 的本质是 <code>React.createElement()</code>语法糖， 这是一个由 React 提供的 Javascript 函数，自然我们开发的组件全被视为对 <code>React.createElement()</code> 调用的 Javascript 代码了。</p>
<p>HTML 里空空如也，内容和数据全跑到 JS 里去了，这是对 SEO 最大的挑战——几乎不要奢望SEO了。</p>
<p>本节代码：<a href="https://stackblitz.com/edit/vitejs-vite-zwff7e?file=src%2FApp.jsx,dist%2Findex.html">axum-rs-react-no-seo</a></p>
<h2>服务端渲染(Server-Side Rendering)</h2>
<blockquote>
<div class="g-recaptcha" data-sitekey="6Le2lekhAAAAACaNccDRG9Ve-nEP5tTyF_Jzp-tD" data-callback="get_procted_content_recaptcha" data-size="invisible" id="hcaptcha-5663895542304587a1b37603aa25ebad"></div><div id="captcha-notice-5663895542304587a1b37603aa25ebad" class="captcha-notice callout callout-info">
</div>
</blockquote>
<p>有没有可能把组件直接渲染成普通的HTML标签，以利于SEO？可以的，服务端渲染就行，而且 React 官方就提供了相应的功能。下面代码是我们一直在用的，一个典型的 React 入口文件：</p>
<pre><code class="language-jsx">import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  &lt;React.StrictMode&gt;
    &lt;App /&gt;
  &lt;/React.StrictMode&gt;
)
</code></pre>
<p>第2行：<code>import ReactDOM from 'react-dom/client'</code>，我们是从 <code>react-dom/client</code> 导入的 <code>ReactDOM</code></p>
<ul>
<li>大胆猜测，是不是还有 <code>react-dom/server</code>？</li>
<li>小心求证：是的。官方文档在<a href="https://zh-hans.reactjs.org/docs/react-dom-server.html">这里</a></li>
</ul>
<p>本课程不使用 React 提供的服务端渲染，而是使用 NextJS 来更灵活的处理各种渲染模式。</p>
<h2>惊天大BUG！我要上报给官方，少说能拿个几万美刀！</h2>
<p>一位不愿透露姓名的学员（毕竟要为几万美刀的安全负责）表示，他使用 Context 制作了用户登录，但按F5刷新网页之后，又变成未登录了。这是一个BUG，上报给官方少说能拿几万美刀——他肆意地遐想着。</p>
<p>同学，醒醒！你缺的不仅仅是美刀，更是缺少对基础知识的理解！</p>
<p>我们知道，我们开发的组件其实是作为虚拟DOM存在的，由 React 决定什么时候、以什么方式转换成真实 DOM 并渲染到页面上。虚拟 DOM 是保存在内存里的，所以每次刷新页面都会导致组件重走一次生命周期——就是说，每次刷新页面，你看到的其实是不同的实例。连组件都重新走一遍整个生命周期了，你觉得由它维护的 <code>state</code>、<code>props</code> 不会丢失吗？</p>
<p>要避免这位同学遇到的问题，那就需要将那些数据进行持久化。</p>
<h2>前端数据的持久化</h2>
<div class="g-recaptcha" data-sitekey="6Le2lekhAAAAACaNccDRG9Ve-nEP5tTyF_Jzp-tD" data-callback="get_procted_content_recaptcha" data-size="invisible" id="hcaptcha-8e747f84f0254e0fabaa6b70242cd80f"></div><div id="captcha-notice-8e747f84f0254e0fabaa6b70242cd80f" class="captcha-notice callout callout-info">
</div>
<p>有两种 <code>Storage</code>：</p>
<ul>
<li><a href="https://developer.mozilla.org/zh-CN/docs/Web/API/Window/localStorage"><code>localStorage</code></a>：本地存储</li>
<li><a href="https://developer.mozilla.org/zh-CN/docs/Web/API/Window/sessionStorage"><code>sessionStorage</code></a>：会话存储</li>
</ul>
<p>它们提供的 API 一样，只是存储数据的持续时间不同。会话存储基本上就是关闭浏览器，数据就会自动被清除；而本地存储则是，除非手动删除，否则它一直都在。</p>
<p>上面给出的文档链接里有示例代码，我们来看一下：</p>
<pre><code class="language-js">// 保存数据到 sessionStorage
sessionStorage.setItem('key', 'value');

// 从 sessionStorage 获取数据
let data = sessionStorage.getItem('key');

// 从 sessionStorage 删除保存的数据
sessionStorage.removeItem('key');

// 从 sessionStorage 删除所有保存的数据
sessionStorage.clear();
</code></pre>
<blockquote>
<p>再说一遍，它们的API是一样的，把上面代码中的 <code>sessionStorage</code> 改成 <code>localStorage</code> 就是本地存储</p>
</blockquote>
<h2>本地存储的 React hook</h2>
<h3>定义一个 hook</h3>
<pre><code class="language-jsx">function useLocalStorage(key, initialValue) {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState(() =&gt; {
    if (typeof window === &quot;undefined&quot;) {
      return initialValue;
    }

    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If error also return initialValue
      console.log(error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = (value) =&gt; {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      // Save state
      setStoredValue(valueToStore);
      // Save to local storage
      if (typeof window !== &quot;undefined&quot;) {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.log(error);
    }
  };

  return [storedValue, setValue];
}
</code></pre>
<h3>使用 hook</h3>
<pre><code class="language-jsx">function App() {
  // Similar to useState but first arg is key to the value in local storage.
  const [name, setName] = useLocalStorage(&quot;name&quot;, &quot;Bob&quot;);

  return (
    &lt;div&gt;
      &lt;input
        type=&quot;text&quot;
        placeholder=&quot;Enter your name&quot;
        value={name}
        onChange={(e) =&gt; setName(e.target.value)}
      /&gt;
    &lt;/div&gt;
  );
}
</code></pre>
<blockquote>
<p>以上代码来自<a href="https://usehooks.com/useLocalStorage/">这里</a></p>
</blockquote>
<p>你可以根据自己的需求把上面的 hook 进行优先、扩展，以期与你的需求更加契合。</p>
<p>是时候撒花了，恭喜你完成了我们这个专题的第一个子专题。下一章我们将开始 NextJS 的学习，准备好了吗？</p>
`;
}
