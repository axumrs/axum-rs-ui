import Card from "../components/Card";
import PageMeta from "../components/PageMeta";
import SubjectListItem from "../components/SubjectListItem";
import TopicListItem from "../components/TopicListItem";

export default function Home() {
  return (
    <>
      <PageMeta />
      {/* 专题 */}
      <Card>
        <Card.Header title="专题列表" moreText="全部专题" href="" />
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2 mb-2">
          <SubjectListItem
            img="https://cdn.hashnode.com/res/hashnode/image/upload/v1607082785538/EryuLRriM.png?w=200&h=200&fit=crop&crop=entropy&auto=compress,format&format=webp"
            href=""
            name="全栈：AXUM、React、NextJS 和 TailWindCSS"
            summary="本专题将带你学习全栈开发所需的相关前端工具链，并在最后通过一个案例来实战全栈开发。"
          />
          <SubjectListItem
            img="https://cdn.hashnode.com/res/hashnode/image/upload/v1513321478077/ByCWNxZMf.png?w=200&h=200&fit=crop&crop=entropy&auto=compress,format&format=webp"
            href=""
            name="全栈：AXUM、React、NextJS 和 TailWindCSS"
            summary="本专题将带你学习全栈开发所需的相关前端工具链，并在最后通过一个案例来实战全栈开发。"
          />
          <SubjectListItem
            img="https://cdn.hashnode.com/res/hashnode/image/upload/vdxecajl3uwbprclsctm/1450469658.jpg?w=200&h=200&fit=crop&crop=faces&auto=compress,format&format=webp&auto=compress,format&format=webp"
            href=""
            name="全栈：AXUM、React、NextJS 和 TailWindCSS"
            summary="本专题将带你学习全栈开发所需的相关前端工具链，并在最后通过一个案例来实战全栈开发。"
          />
          <SubjectListItem
            img="https://cdn.hashnode.com/res/hashnode/image/upload/cnvm0znfqcrwelhgtblb/1496913014.png?w=200&h=200&fit=crop&crop=faces&auto=compress,format&format=webp&auto=compress,format&format=webp"
            href=""
            name="全栈：AXUM、React、NextJS 和 TailWindCSS"
            summary="本专题将带你学习全栈开发所需的相关前端工具链，并在最后通过一个案例来实战全栈开发。"
          />
        </div>
      </Card>
      {/* 文章 */}

      <Card className="mt-3 ">
        <Card.Header title="热门文章" moreText="全部文章" href="" />
        <ul className="flex flex-col divide-y -mt-2">
          <li className="py-2">
            <TopicListItem
              subject={{
                slug: "1",
                name: "全栈：AXUM、React、NextJS 和 TailWindCSS",
              }}
              topic={{
                slug: "1",
                title: "React: SEO挑战、服务端渲染及本地存储",
                summary:
                  "经过紧张的学习，React课程终于暂告一个段落了。本章将是一个相对轻松的内容，我们一起探讨一下React 应用的 SEO 以及为什么需要服务端渲染，同时对 React课程做个简单的小结。",
                cover: "",
                tags: ["标签1", "标签2"],
                try_readable: false,
              }}
            />
          </li>

          <li className="py-2">
            <TopicListItem
              subject={{
                slug: "2",
                name: "全栈：AXUM、React、NextJS 和 TailWindCSS",
              }}
              topic={{
                slug: "2",
                title: "React: SEO挑战、服务端渲染及本地存储",
                summary:
                  "经过紧张的学习，React课程终于暂告一个段落了。本章将是一个相对轻松的内容，我们一起探讨一下React 应用的 SEO 以及为什么需要服务端渲染，同时对 React课程做个简单的小结。",
                cover:
                  "https://cdn.hashnode.com/res/hashnode/image/upload/v1684170814296/50fd7774-8684-45b1-ab70-6e5f82707b3f.png?w=1600&h=840&fit=crop&crop=entropy&auto=compress,format&format=webp",
                tags: ["标签1", "标签2"],
                try_readable: true,
              }}
            />
          </li>
          <li className="py-2">
            <TopicListItem
              subject={{
                slug: "3",
                name: "全栈：AXUM、React、NextJS 和 TailWindCSS",
              }}
              topic={{
                slug: "3",
                title: "React: SEO挑战、服务端渲染及本地存储",
                summary:
                  "经过紧张的学习，React课程终于暂告一个段落了。本章将是一个相对轻松的内容，我们一起探讨一下React 应用的 SEO 以及为什么需要服务端渲染，同时对 React课程做个简单的小结。",
                cover: "",
                tags: ["标签1", "标签2"],
                try_readable: true,
              }}
            />
          </li>
          <li className="py-2">
            <TopicListItem
              subject={{
                slug: "4",
                name: "全栈：AXUM、React、NextJS 和 TailWindCSS",
              }}
              topic={{
                slug: "4",
                title: "React: SEO挑战、服务端渲染及本地存储",
                summary:
                  "经过紧张的学习，React课程终于暂告一个段落了。本章将是一个相对轻松的内容，我们一起探讨一下React 应用的 SEO 以及为什么需要服务端渲染，同时对 React课程做个简单的小结。",
                cover: "",
                tags: ["标签1", "标签2"],
                try_readable: false,
              }}
            />
          </li>

          <li className="py-2">
            <TopicListItem
              subject={{
                slug: "5",
                name: "全栈：AXUM、React、NextJS 和 TailWindCSS",
              }}
              topic={{
                slug: "5",
                title: "React: SEO挑战、服务端渲染及本地存储",
                summary:
                  "经过紧张的学习，React课程终于暂告一个段落了。本章将是一个相对轻松的内容，我们一起探讨一下React 应用的 SEO 以及为什么需要服务端渲染，同时对 React课程做个简单的小结。",
                cover:
                  "https://cdn.hashnode.com/res/hashnode/image/upload/v1684170814296/50fd7774-8684-45b1-ab70-6e5f82707b3f.png?w=1600&h=840&fit=crop&crop=entropy&auto=compress,format&format=webp",
                tags: ["标签1", "标签2"],
                try_readable: false,
              }}
            />
          </li>
          <li className="py-2">
            <TopicListItem
              subject={{
                slug: "6",
                name: "全栈：AXUM、React、NextJS 和 TailWindCSS",
              }}
              topic={{
                slug: "6",
                title: "React: SEO挑战、服务端渲染及本地存储",
                summary:
                  "经过紧张的学习，React课程终于暂告一个段落了。本章将是一个相对轻松的内容，我们一起探讨一下React 应用的 SEO 以及为什么需要服务端渲染，同时对 React课程做个简单的小结。",
                cover: "",
                tags: ["标签1", "标签2"],
                try_readable: true,
              }}
            />
          </li>
        </ul>
      </Card>
    </>
  );
}
