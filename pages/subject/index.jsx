import React from "react";
import PageMeta from "../../components/PageMeta";
import Card from "../../components/Card";
import { ShoppingCartIcon } from "@heroicons/react/24/solid";
import PageTitle from "../../components/PageTitle";
import Paginate from "../../components/Paginate";

export default function SubjectIndex() {
  return (
    <>
      <PageMeta>专题</PageMeta>
      <PageTitle>专题</PageTitle>

      <div className="px-3 grid grid-cols-1 gap-3 lg:grid-cols-2 lg:px-0">
        <Card className="hover:shadow">
          <div className="grid grid-cols-12 gap-x-2">
            <div className="col-span-2">
              <img
                src="https://cdn.hashnode.com/res/hashnode/image/upload/v1607082785538/EryuLRriM.png?w=200&h=200&fit=crop&crop=entropy&auto=compress,format&format=webp"
                className="w-full object-cover"
              />
            </div>
            <div className="col-span-10">
              <h3 className="">
                <a
                  href=""
                  className="text-lg font-semibold hover:text-rose-800"
                >
                  全栈：AXUM、React、NextJS 和 TailWindCSS
                </a>
              </h3>
              <div className="">
                本专题将带你学习全栈开发所需的相关前端工具链，并在最后通过一个案例来实战全栈开发。
              </div>
            </div>
          </div>
          <div className="mt-2 flex justify-end items-center space-x-1">
            <span className="text-sm border bg-orange-600 text-white rounded px-2 py-1">
              连载中
            </span>
            <span className="text-sm border bg-emerald-600 text-white rounded px-2 py-1">
              免费
            </span>
          </div>
        </Card>
        <Card className="hover:shadow">
          <div className="grid grid-cols-12 gap-x-2">
            <div className="col-span-2">
              <img
                src="https://cdn.hashnode.com/res/hashnode/image/upload/v1607082785538/EryuLRriM.png?w=200&h=200&fit=crop&crop=entropy&auto=compress,format&format=webp"
                className="w-full object-cover"
              />
            </div>
            <div className="col-span-10">
              <h3 className="">
                <a
                  href=""
                  className="text-lg font-semibold hover:text-rose-800"
                >
                  全栈：AXUM、React、NextJS 和 TailWindCSS
                </a>
              </h3>
              <div className="">
                本专题将带你学习全栈开发所需的相关前端工具链，并在最后通过一个案例来实战全栈开发。
              </div>
            </div>
          </div>
          <div className="mt-2 flex justify-end items-center space-x-1">
            <span className="text-sm border bg-green-600 text-white rounded px-2 py-1">
              已完结
            </span>
            <span className="text-red-600 rounded px-2 py-1 border border-red-600">
              12345 USDT
            </span>
            <a
              href=""
              className="border border-blue-700 text-white bg-blue-600 px-2 py-1 rounded"
            >
              <ShoppingCartIcon className="w-6 h-6" />
            </a>
          </div>
        </Card>
        <Card className="hover:shadow">
          <div className="grid grid-cols-12 gap-x-2">
            <div className="col-span-2">
              <img
                src="https://cdn.hashnode.com/res/hashnode/image/upload/v1607082785538/EryuLRriM.png?w=200&h=200&fit=crop&crop=entropy&auto=compress,format&format=webp"
                className="w-full object-cover"
              />
            </div>
            <div className="col-span-10">
              <h3 className="">
                <a
                  href=""
                  className="text-lg font-semibold hover:text-rose-800"
                >
                  全栈：AXUM、React、NextJS 和 TailWindCSS
                </a>
              </h3>
              <div className="">
                本专题将带你学习全栈开发所需的相关前端工具链，并在最后通过一个案例来实战全栈开发。
              </div>
            </div>
          </div>
          <div className="mt-2 flex justify-end items-center space-x-1">
            <span className="text-sm border bg-green-600 text-white rounded px-2 py-1">
              已完结
            </span>
            <span className="text-red-600 rounded px-2 py-1 border border-red-600">
              12345 USDT
            </span>
            <a
              href=""
              className="border border-blue-700 text-white bg-blue-600 px-2 py-1 rounded"
            >
              <ShoppingCartIcon className="w-6 h-6" />
            </a>
          </div>
        </Card>
        <Card className="hover:shadow">
          <div className="grid grid-cols-12 gap-x-2">
            <div className="col-span-2">
              <img
                src="https://cdn.hashnode.com/res/hashnode/image/upload/v1607082785538/EryuLRriM.png?w=200&h=200&fit=crop&crop=entropy&auto=compress,format&format=webp"
                className="w-full object-cover"
              />
            </div>
            <div className="col-span-10">
              <h3 className="">
                <a
                  href=""
                  className="text-lg font-semibold hover:text-rose-800"
                >
                  全栈：AXUM、React、NextJS 和 TailWindCSS
                </a>
              </h3>
              <div className="">
                本专题将带你学习全栈开发所需的相关前端工具链，并在最后通过一个案例来实战全栈开发。
              </div>
            </div>
          </div>
          <div className="mt-2 flex justify-end items-center space-x-1">
            <span className="text-sm border bg-orange-600 text-white rounded px-2 py-1">
              连载中
            </span>
            <span className="text-sm border bg-emerald-600 text-white rounded px-2 py-1">
              免费
            </span>
          </div>
        </Card>
        <Card className="hover:shadow">
          <div className="grid grid-cols-12 gap-x-2">
            <div className="col-span-2">
              <img
                src="https://cdn.hashnode.com/res/hashnode/image/upload/v1607082785538/EryuLRriM.png?w=200&h=200&fit=crop&crop=entropy&auto=compress,format&format=webp"
                className="w-full object-cover"
              />
            </div>
            <div className="col-span-10">
              <h3 className="">
                <a
                  href=""
                  className="text-lg font-semibold hover:text-rose-800"
                >
                  全栈：AXUM、React、NextJS 和 TailWindCSS
                </a>
              </h3>
              <div className="">
                本专题将带你学习全栈开发所需的相关前端工具链，并在最后通过一个案例来实战全栈开发。
              </div>
            </div>
          </div>
          <div className="mt-2 flex justify-end items-center space-x-1">
            <span className="text-sm border bg-green-600 text-white rounded px-2 py-1">
              已完结
            </span>
            <span className="text-red-600 rounded px-2 py-1 border border-red-600">
              12345 USDT
            </span>
            <a
              href=""
              className="border border-blue-700 text-white bg-blue-600 px-2 py-1 rounded"
            >
              <ShoppingCartIcon className="w-6 h-6" />
            </a>
          </div>
        </Card>
      </div>

      <div className="my-3 text-right">
        <Paginate />
      </div>
    </>
  );
}
