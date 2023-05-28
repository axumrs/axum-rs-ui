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
import { get, geta } from "../../../fetcher/fetcher";
import datelineFormat from "../../../utils/dtf";
import { getTokenSSR } from "../../../utils/cookie";
import code from "../../../utils/code";
import PageTitle from "../../../components/PageTitle";
import { useCartContext } from "../../../contexts/CartContext";
import { useRouter } from "next/router";
import {
  CurrencyDollarIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/solid";

export default function TopicDetail({ resp }) {
  const topic = resp?.data || { tag_names: "" };

  useEffect(() => {
    hljs.highlightAll();
  }, []);

  useEffect(() => {}, []);

  return (
    <>
      <>
        <PageMeta>
          {topic?.title} - {topic?.subject_name}
        </PageMeta>
        {/* <div>{JSON.stringify(resp)}</div> */}
        {topic?.cover && (
          <div className="mb-3 mx-3 lg:mx-0">
            <img
              src="https://cdn.hashnode.com/res/hashnode/image/upload/v1684170814296/50fd7774-8684-45b1-ab70-6e5f82707b3f.png?w=1600&h=840&fit=crop&crop=entropy&auto=compress,format&format=webp"
              className="w-full object-cover rounded-md border"
            />
          </div>
        )}

        <Card className="mx-3 lg:mx-0">
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-xl font-bold lg:text-3xl lg:font-extrabold">
              {topic?.title}
            </h1>
            <div className="flex justify-start items-center text-gray-600 text-sm space-x-1 my-3">
              <span>
                <NewspaperIcon className="w-4 h-4" />
              </span>
              <Link
                href={`/subject/${topic?.subject_slug}`}
                className="hover:underline hover:decoration-dotted hover:text-gray-700"
              >
                {topic?.subject_name}
              </Link>
            </div>
            <div className="flex justify-start items-center text-gray-500 text-xs space-x-2">
              <div className="flex justify-start items-center space-x-1">
                <span>
                  <EyeIcon className="w-4 h-4" />
                </span>
                <span>{topic?.hit}</span>
              </div>
              <div className="flex justify-start items-center space-x-1">
                <span>
                  <CalendarDaysIcon className="w-4 h-4" />
                </span>
                <span>{datelineFormat(topic?.dateline)}</span>
              </div>
            </div>
            <div className="flex justify-start items-center text-gray-500 text-xs space-x-1 mt-3">
              <span>
                <TagIcon className="w-4 h-4" />
              </span>
              {topic?.tag_names
                .split(",")
                .filter((t) => t.trim().length > 0)
                .map((t) => (
                  <Link
                    key={`topic-${topic?.id}-tag-${t}`}
                    className="before:content-['#'] hover:underline hover:decoration-dashed"
                    href={`/tag/${t}`}
                  >
                    {t}
                  </Link>
                ))}
            </div>
          </div>
        </Card>

        <Card className="my-3 mx-3 lg:mx-0">
          {resp?.code === code.OK ? (
            <TopicNormalHtml topic={topic} />
          ) : (
            <NeedPurchased topic={topic} />
          )}
        </Card>
      </>
    </>
  );
}

export async function getServerSideProps({ params, req, res }) {
  const { subject_slug, slug } = params;
  const token = getTokenSSR({ req, res });

  const resp = await geta(`/topic/${subject_slug}/${slug}`, token);

  return { props: { resp } };
}

function TopicNormalHtml({ topic }) {
  return (
    <div
      dangerouslySetInnerHTML={{ __html: topic?.html }}
      className="prose max-w-none lg:prose-xl"
    ></div>
  );
}

function NeedPurchased({ topic }) {
  const { newItem, addItem } = useCartContext();
  const router = useRouter();

  const addToCart = (s) => {
    return () => {
      // type, service, serviceID, price, number
      const item = newItem(
        "专题",
        s.subject_name,
        s.subject_id,
        s.price / 100,
        1
      );
      addItem(item);
      router.push("/cart");
    };
  };
  return (
    <>
      <div className="flex flex-col space-y-4 justify-center items-center">
        <div className="text-lg text-cyan-600 font-semibold">
          {topic?.subject_name}
        </div>
        <div>你需要购买此专题才能查看本文内容</div>
      </div>
      <div className="mt-6 flex justify-center items-center space-x-1">
        <div className="flex justify-start items-center space-x-1 text-red-600 rounded px-2 py-1 border border-red-600">
          <span>价格：</span>
          <CurrencyDollarIcon className="w-4 h-4" />
          <span className="">{topic.price / 100}</span>
        </div>
        <button
          className="border border-blue-700 text-white bg-blue-600 px-2 py-1 rounded flex justify-start items-center space-x-1"
          onClick={addToCart({ ...topic })}
        >
          <ShoppingCartIcon className="w-6 h-6" />
          <span className="border-l pl-2 ml-2">立即购买</span>
        </button>
      </div>
    </>
  );
}
