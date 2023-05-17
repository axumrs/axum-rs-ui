import Card from "../components/Card";
import PageMeta from "../components/PageMeta";
import SubjectListItem from "../components/SubjectListItem";
import TopicListItem from "../components/TopicListItem";
import { get } from "../fetcher/fetcher";

export default function Home({ subjectList = [], topicList = [] }) {
  return (
    <>
      <PageMeta />
      {/* <div>{JSON.stringify(topicList)}</div> */}
      <div className="px-3 lg:px-0">
        {/* 专题 */}
        <Card>
          <Card.Header title="专题列表" moreText="全部专题" href="/subject" />

          <div className="grid grid-cols-1 gap-3 lg:grid-cols-2 mb-2">
            {subjectList.map((s) => (
              <SubjectListItem
                key={s.id}
                img="https://cdn.hashnode.com/res/hashnode/image/upload/v1607082785538/EryuLRriM.png?w=200&h=200&fit=crop&crop=entropy&auto=compress,format&format=webp"
                href={`/subject/${s.slug}`}
                name={s.name}
                summary={s.summary}
              />
            ))}
          </div>
        </Card>
        {/* 文章 */}

        <Card className="my-3 ">
          <Card.Header
            title="热门文章"
            moreText="全部文章"
            href="/topic"
            className="pb-3 border-b"
          />
          <ul className="flex flex-col divide-y -mt-2">
            {topicList.map((t) => (
              <li className="py-2" key={t.id}>
                <TopicListItem
                  subject={{
                    slug: t.subject_slug,
                    name: t.subject_name,
                  }}
                  topic={{
                    slug: t.slug,
                    title: t.title,
                    summary: t.summary,
                    cover: t.cover,
                    tags: t.tag_names.split(","),
                    try_readable: t.try_readable,
                  }}
                />
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </>
  );
}

export async function getServerSideProps() {
  // const res = await fetch("http://127.0.0.1:9527/web/subject/top4", {
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  // });
  // const { data } = await res.json();
  const [{ data: subjectList }, { data: topicList }] = await Promise.all([
    get("/subject/top4"),
    get("/topic/top10"),
  ]);

  return { props: { subjectList, topicList } };
}
