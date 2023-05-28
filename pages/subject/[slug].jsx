import React from "react";
import PageMeta from "../../components/PageMeta";
import Card from "../../components/Card";
import {
  CurrencyDollarIcon,
  ShoppingCartIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/solid";
import TopicListItem from "../../components/TopicListItem";
import { get, geta } from "../../fetcher/fetcher";
import Paginate from "../../components/Paginate";
import { useCartContext } from "../../contexts/CartContext";
import { useRouter } from "next/router";
import { getTokenSSR } from "../../utils/cookie";

export default function SubjectDetail({ subjectIfPurchased, topicPaginate }) {
  const { data: topicList } = topicPaginate;
  const { newItem, addItem } = useCartContext();
  const { subject } = subjectIfPurchased;
  const router = useRouter();

  const addToCart = (s) => {
    return () => {
      // type, service, serviceID, price, number
      const item = newItem("专题", s.name, s.id, s.price / 100, 1);
      addItem(item);
      router.push("/cart");
    };
  };

  return (
    <>
      <PageMeta>{subject.name}</PageMeta>
      {/* <div>{JSON.stringify(subject)}</div>
      <div>{JSON.stringify(topicPaginate)}</div> */}
      <Card className="mx-3 lg:mx-0">
        <div className="p-8">
          <div
            className={`flex p-4  rounded-lg justify-center items-center space-x-2`}
          >
            <div className="flex-shrink-0  flex flex-col justify-center items-center">
              <img
                src={
                  subject.cover
                    ? subject.cover
                    : "https://file.axum.rs/icons/rust/rust-plain.svg"
                }
                className="w-10 object-cover rounded"
                alt={subject.name}
              />
            </div>
            <div className="">
              <h3 className="text-lg font-semibold">{subject.name}</h3>
            </div>
          </div>
          <div className="my-3 text-center">{subject.summary}</div>
          <div className="mt-6 flex justify-center items-center space-x-1">
            {subject.status === "Writing" ? (
              <span className="text-sm border bg-orange-600 text-white rounded px-2 py-1">
                连载中
              </span>
            ) : (
              <span className="text-sm border bg-green-600 text-white rounded px-2 py-1">
                已完结
              </span>
            )}
            {subject.price > 0 ? (
              subjectIfPurchased.is_purchased ? (
                <>
                  <div className="flex justify-start items-center space-x-1 bg-blue-500 text-white px-2 py-1 border text-sm border-blue-500 rounded">
                    <CheckCircleIcon className="w-4 h-4" />
                    <span>你已购买本专题</span>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex justify-start items-center space-x-1 text-red-600 rounded px-2 py-1 border border-red-600">
                    <CurrencyDollarIcon className="w-4 h-4" />
                    <span className="">{subject.price / 100}</span>
                  </div>
                  <button
                    className="border border-blue-700 text-white bg-blue-600 px-2 py-1 rounded"
                    onClick={addToCart({ ...subject })}
                  >
                    <ShoppingCartIcon className="w-6 h-6" />
                  </button>
                </>
              )
            ) : (
              <span className="text-sm border bg-emerald-600 text-white rounded px-2 py-1">
                免费
              </span>
            )}
          </div>
        </div>
      </Card>

      <Card className="my-3 mx-3 lg:mx-0">
        {topicList.length ? (
          <ul className="flex flex-col divide-y">
            {topicList.map((t) => (
              <li className="py-2" key={`topic-${t.id}`}>
                <TopicListItem
                  subject={{ ...subject }}
                  topic={{
                    ...t,
                    tags: t.tag_names.split(","),
                  }}
                  showSubject={false}
                />
              </li>
            ))}
          </ul>
        ) : (
          <>没有记录</>
        )}
      </Card>

      {topicPaginate.total_page > 0 ? (
        <div className="my-3 text-right mx-3 lg:mx-0">
          <Paginate
            totalPage={topicPaginate.total_page}
            page={topicPaginate.page}
            baseUrl={`/subject/${subject.slug}`}
          />
        </div>
      ) : (
        <div className="my-3"></div>
      )}
    </>
  );
}

export async function getServerSideProps({ params, query, req, res }) {
  const { slug } = params;
  const { page: pageStr } = query;
  const page = parseInt(pageStr, 10) || 0;
  const token = getTokenSSR({ req, res });

  const [{ data: subjectIfPurchased }, { data: topicPaginate }] =
    await Promise.all([
      geta(`/subject/${slug}`, token),
      get(
        `/topic?subject_slug=${slug}&page=${page}&page_size=30&asc_order=true`
      ),
    ]);

  return { props: { subjectIfPurchased, topicPaginate } };
}
