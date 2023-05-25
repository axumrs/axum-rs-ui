import React from "react";
import PageMeta from "../../components/PageMeta";
import Card from "../../components/Card";
import {
  ShoppingCartIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/solid";
import PageTitle from "../../components/PageTitle";
import Paginate from "../../components/Paginate";
import { get } from "../../fetcher/fetcher";
import Link from "next/link";
import { useCartContext } from "../../contexts/CartContext";
import { useRouter } from "next/router";

export default function SubjectIndex({ subjectPaginate }) {
  const { data: subjectList } = subjectPaginate;
  const { newItem, addItem } = useCartContext();
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
      <PageMeta>专题</PageMeta>
      <PageTitle>专题</PageTitle>

      <div className="px-3 grid grid-cols-1 gap-3 lg:grid-cols-2 lg:px-0">
        {subjectList.map((s) => (
          <Card className="hover:shadow" key={s.id}>
            <div className="grid grid-cols-12 gap-x-2">
              <div className="col-span-2">
                <img
                  src="https://cdn.hashnode.com/res/hashnode/image/upload/v1607082785538/EryuLRriM.png?w=200&h=200&fit=crop&crop=entropy&auto=compress,format&format=webp"
                  className="w-full object-cover"
                />
              </div>
              <div className="col-span-10">
                <h3 className="">
                  <Link
                    href={`/subject/${s.slug}`}
                    className="text-lg font-semibold hover:text-rose-800"
                  >
                    {s.name}
                  </Link>
                </h3>
                <div className="">{s.summary}</div>
              </div>
            </div>
            <div className="mt-2 flex justify-end items-center space-x-1">
              {s.status === "Writing" ? (
                <span className="text-sm border bg-orange-600 text-white rounded px-2 py-1">
                  连载中
                </span>
              ) : (
                <span className="text-sm border bg-green-600 text-white rounded px-2 py-1">
                  已完结
                </span>
              )}
              {s.price > 0 ? (
                <>
                  <div className="flex justify-start items-center space-x-1 text-red-600 rounded px-2 py-1 border border-red-600">
                    <CurrencyDollarIcon className="w-4 h-4" />
                    <span className="">{s.price / 100}</span>
                  </div>
                  <button
                    className="border border-blue-700 text-white bg-blue-600 px-2 py-1 rounded"
                    onClick={addToCart({ ...s })}
                  >
                    <ShoppingCartIcon className="w-6 h-6" />
                  </button>
                </>
              ) : (
                <span className="text-sm border bg-emerald-600 text-white rounded px-2 py-1">
                  免费
                </span>
              )}
            </div>
          </Card>
        ))}
      </div>
      {subjectPaginate.total_page > 0 ? (
        <div className="my-3 text-right mx-3 lg:mx-0">
          <Paginate
            totalPage={subjectPaginate.total_page}
            page={subjectPaginate.page}
            baseUrl="/subject"
          />
        </div>
      ) : (
        <div className="my-3"></div>
      )}
    </>
  );
}

export async function getServerSideProps({ query }) {
  const { page: pageStr } = query;
  const page = parseInt(pageStr, 10) || 0;

  const { data: subjectPaginate } = await get(
    `/subject?page=${page}&page_size=30`
  );

  return { props: { subjectPaginate } };
}
