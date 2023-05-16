import MoreButton from "../components/Button/MoreButton";
import Card from "../components/Card";
import PageMeta from "../components/PageMeta";
import SubjectListItem from "../components/SubjectListItem";

export default function Home() {
  return (
    <>
      <PageMeta />
      <Card>
        <div className="flex justify-start items-center space-x-2 mb-3">
          <h2 className="text-xl font-semibold">专题列表</h2>
          <MoreButton href="">全部专题</MoreButton>
        </div>
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
          {/* item */}
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

          {/* item end */}
        </div>
      </Card>
    </>
  );
}
