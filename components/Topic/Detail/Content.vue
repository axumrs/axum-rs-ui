<script setup lang="ts">
import hljs from "highlight.js";
import "highlight.js/styles/github.css";

onMounted(() => {
  hljs.highlightAll();
});
</script>

<template>
  <div class="prose max-w-none lg:prose-xl bg-white p-4 border rounded-md">
    <p>本章我们将开始实现第一步：解析 <code>derive(Db)</code>。</p>
    <h2>创建项目及导出过程宏</h2>
    <p>首先，我们创建一个 <code>lib</code> 项目：</p>
    <pre class="pre"><code class="language-bash hljs">cargo new db-derive --lib
</code></pre>
    <p>
      接着，我们需要做最重要的一步：<strong>导出过程宏</strong>。打开
      <code>Cargo.toml</code>，增加以下配置：
    </p>
    <pre
      class="pre"
    ><code class="language-toml hljs language-ini"><span class="hljs-section">[lib]</span>
<span class="hljs-attr">proc-macro</span> = <span class="hljs-literal">true</span>
</code></pre>
    <p>加入最需要的3个依赖：</p>
    <pre
      class="pre"
    ><code class="language-toml hljs language-ini"><span class="hljs-section">[dependencies]</span>
<span class="hljs-attr">syn</span> = { version = <span class="hljs-string">"2"</span>, features = [<span class="hljs-string">"extra-traits"</span>] }
<span class="hljs-attr">quote</span> = <span class="hljs-string">"1"</span>
<span class="hljs-attr">proc-macro2</span> = <span class="hljs-string">"1"</span>
</code></pre>
    <blockquote>
      <p>
        <code>syn</code> 的 <code>extra-traits</code> 可以让
        <code>syn</code> 的数据实现
        <code>Debug</code>，以便于我们调试。开发完成后，可以将此 feature 去除。
      </p>
    </blockquote>
    <p>
      由于我们是基于 sqlx 进行 CRUD
      的，所以将它加入到开发依赖。同时，我们还需要其它一些常用的开发依赖：
    </p>
    <pre
      class="pre"
    ><code class="language-toml hljs language-ini"><span class="hljs-section">[dev-dependencies]</span>
<span class="hljs-attr">tokio</span> = { version = <span class="hljs-string">"1"</span>, features = [<span class="hljs-string">"full"</span>] }
<span class="hljs-attr">serde</span> = { version = <span class="hljs-string">"1"</span>, features = [<span class="hljs-string">"derive"</span>] }
<span class="hljs-attr">chrono</span> = { version = <span class="hljs-string">"0.4"</span>, features = [<span class="hljs-string">"serde"</span>] }
<span class="hljs-attr">sqlx</span> = { version = <span class="hljs-string">"0.7"</span>, features = [<span class="hljs-string">"runtime-tokio"</span>, <span class="hljs-string">"postgres"</span>, <span class="hljs-string">"chrono"</span>] }
</code></pre>
    <h2>定义名为<code>Db</code>的 dervie</h2>
    <p>
      打开 <code>lib.rs</code> ，新建一个
      <code>db_derive</code>
      函数（函数名随意，只是为了明确语义，我们选择了这个函数名）：
    </p>
    <pre
      class="pre"
    ><code class="language-rust hljs"><span class="hljs-comment">// src/lib.rs</span>

<span class="hljs-meta">#[proc_macro_derive(Db)]</span>
<span class="hljs-keyword">pub</span> <span class="hljs-keyword">fn</span> <span class="hljs-title function_">db_derive</span>(input: proc_macro::TokenStream) <span class="hljs-punctuation">-&gt;</span> proc_macro::TokenStream {
    <span class="hljs-built_in">println!</span>(<span class="hljs-string">"{:#?}"</span>, input);
    proc_macro::TokenStream::<span class="hljs-title function_ invoke__">default</span>()
}

</code></pre>
    <p>
      这个函数非常简单：接收一个
      <code>proc_macro::TokenStream</code>，然后返回一个
      <code>proc_macro::TokenStream</code>。<a
        href="https://doc.rust-lang.org/stable/proc_macro/struct.TokenStream.html"
        target="_blank"
        ><code>proc_macro::TokenStream</code></a
      >
      可以理解为代码的抽象树，它可以构成合法的 rust 代码。
    </p>
    <ul>
      <li>
        <code>input</code> 参数是指，应用到该 derive
        的实体（比如结构体）的完成代码抽象树
      </li>
      <li>
        返回值是指，如何处理 <code>input</code> ，并根据需要生成新的代码抽象树
      </li>
    </ul>
    <p>
      注意，要使用 <code>proc_macro::TokenStream</code>，必须加上
      <code>#[proc_macro]</code>, <code>#[proc_macro_attribute]</code> 或
      <code>#[proc_macro_derive]</code>。
    </p>
    <p>本例中：</p>
    <ul>
      <li>
        我们只是简单的打印了实体的代码抽象树：<code
          >println!("{:#?}", input);</code
        >
      </li>
      <li>
        然后返回了一个空的抽象树：<code
          >proc_macro::TokenStream::default()</code
        >
      </li>
    </ul>
    <h2>三种过程宏</h2>
    <p>Rust 的过程宏支持三种过程宏，分别是：</p>
    <ul>
      <li>
        <code>#[proc_macro]</code>：函数形式的过程宏。使用方式类似我们常用的
        <code>println!()</code>以及用<a
          href="https://doc.rust-lang.org/reference/macros-by-example.html"
          target="_blank"
          >声明宏</a
        >（即使用 <code>macro_rules!</code>）定义的宏。
      </li>
      <li>
        <code>#[proc_macro_attribute]</code>：属性宏。使用方式类似于
        <code>#[cfg(test)]</code>。
      </li>
      <li>
        <code>#[proc_macro_derive]</code>：Derive
        宏。本专题要讲述的内容，使用方式类似于：<code>#[derive(Debug)]</code>。Derive
        宏也可以定义属性，所以对于专题来讲，该宏符合我们的需求。
      </li>
    </ul>
    <p>
      <code>#proc_macro_derive</code>最简单的用法就是
      <code>#proc_macro_derive(宏名称)</code>，比如我们定义的
      <code>#[proc_macro_derive(Db)]</code>，是指我们定义了一个名为
      <code>Db</code>的 Derive宏，可以这样使用：<code>#[derive(Db)]</code>
    </p>
    <h2>使用 <code>Db</code> 宏</h2>
    <div>
      <p>
        在项目根目录下（和<code>src</code> 目录同级）创建一个
        <code>examples</code>目录，用于测试我们的宏。首先，创建
        <code>examples/ch01-parse-derive.rs</code> 文件，并输入以下内容：
      </p>
    </div>
    <pre
      class="pre"
    ><code class="language-rust hljs"><span class="hljs-comment">// examples/ch01-parse-derive.rs</span>

<span class="hljs-keyword">use</span> db_derive::Db;

<span class="hljs-meta">#[derive(Db)]</span>
<span class="hljs-keyword">pub</span> <span class="hljs-keyword">struct</span> <span class="hljs-title class_">User</span> {
    <span class="hljs-keyword">pub</span> id: <span class="hljs-type">String</span>,
    <span class="hljs-keyword">pub</span> email: <span class="hljs-type">String</span>,
    <span class="hljs-keyword">pub</span> password: <span class="hljs-type">String</span>,
    <span class="hljs-keyword">pub</span> nickname: <span class="hljs-type">String</span>,
    <span class="hljs-keyword">pub</span> dateline: chrono::DateTime&lt;chrono::Local&gt;,
}

<span class="hljs-keyword">fn</span> <span class="hljs-title function_">main</span>() {}
</code></pre>
    <div>
      <p>
        我们定义了一个 <code>User</code> 结构体，并使用了我们刚刚创建的
        <code>Db</code> Derive宏。现在通过下面的命令运行：
      </p>
    </div>
    <div>
      <pre
        class="pre"
      ><code class="language-bash hljs">cargo <span class="hljs-built_in">test</span> --examples ch01-parse-derive
</code></pre>
    </div>
    <p>
      神奇的一幕发生了，我们看到 <code>User</code> 结构体的抽象树被打印出来了：
    </p>
    <pre class="pre"><code class="hljs language-dts">TokenStream [
    <span class="hljs-title class_">Ident</span> <span class="hljs-punctuation">{</span>
<span class="hljs-symbol">        ident:</span> <span class="hljs-string">"pub"</span>,
<span class="hljs-symbol">        span:</span> <span class="hljs-meta">#0 bytes(34..37),</span>
    <span class="hljs-punctuation">}</span>,
    <span class="hljs-title class_">Ident</span> <span class="hljs-punctuation">{</span>
<span class="hljs-symbol">        ident:</span> <span class="hljs-string">"struct"</span>,
<span class="hljs-symbol">        span:</span> <span class="hljs-meta">#0 bytes(38..44),</span>
    <span class="hljs-punctuation">}</span>,
    <span class="hljs-title class_">Ident</span> <span class="hljs-punctuation">{</span>
<span class="hljs-symbol">        ident:</span> <span class="hljs-string">"User"</span>,
<span class="hljs-symbol">        span:</span> <span class="hljs-meta">#0 bytes(45..49),</span>
    <span class="hljs-punctuation">}</span>,
    <span class="hljs-title class_">Group</span> <span class="hljs-punctuation">{</span>
<span class="hljs-symbol">        delimiter:</span> Brace,
<span class="hljs-symbol">        stream:</span> TokenStream [
            <span class="hljs-title class_">Ident</span> <span class="hljs-punctuation">{</span>
<span class="hljs-symbol">                ident:</span> <span class="hljs-string">"pub"</span>,
<span class="hljs-symbol">                span:</span> <span class="hljs-meta">#0 bytes(56..59),</span>
            <span class="hljs-punctuation">}</span>,
            <span class="hljs-title class_">Ident</span> <span class="hljs-punctuation">{</span>
<span class="hljs-symbol">                ident:</span> <span class="hljs-string">"id"</span>,
<span class="hljs-symbol">                span:</span> <span class="hljs-meta">#0 bytes(60..62),</span>
            <span class="hljs-punctuation">}</span>,
            <span class="hljs-title class_">Punct</span> <span class="hljs-punctuation">{</span>
<span class="hljs-symbol">                ch:</span> <span class="hljs-string">':'</span>,
<span class="hljs-symbol">                spacing:</span> Alone,
<span class="hljs-symbol">                span:</span> <span class="hljs-meta">#0 bytes(62..63),</span>
            <span class="hljs-punctuation">}</span>,
            <span class="hljs-title class_">Ident</span> <span class="hljs-punctuation">{</span>
<span class="hljs-symbol">                ident:</span> <span class="hljs-string">"String"</span>,
<span class="hljs-symbol">                span:</span> <span class="hljs-meta">#0 bytes(64..70),</span>
            <span class="hljs-punctuation">}</span>,
            <span class="hljs-title class_">Punct</span> <span class="hljs-punctuation">{</span>
<span class="hljs-symbol">                ch:</span> <span class="hljs-string">','</span>,
<span class="hljs-symbol">                spacing:</span> Alone,
<span class="hljs-symbol">                span:</span> <span class="hljs-meta">#0 bytes(70..71),</span>
            <span class="hljs-punctuation">}</span>,
            <span class="hljs-comment">// ...</span>
        ],
<span class="hljs-symbol">        span:</span> <span class="hljs-meta">#0 bytes(50..199),</span>
    <span class="hljs-punctuation">}</span>,
]
</code></pre>
    <p>
      从打印的结果不难看出，结构体本身的名字、所有字段的名字、可见性及数据类型都打印出来了。
    </p>
    <blockquote>
      <p>你也可以通过创建 <code>tests</code> 目录来进行测试</p>
    </blockquote>
    <p>
      本章代码位于<a
        href="https://github.com/axumrs/db-derive/tree/01/%E8%A7%A3%E6%9E%90derive"
        target="_blank"
        >01/解析derive</a
      >分支。
    </p>
  </div>
</template>
<style scoped>
.prose pre,
.prose-lg pre {
  padding: 1px !important;
  border-radius: 2px !important;
  background-color: rgb(209 213 219) !important;
}
</style>
