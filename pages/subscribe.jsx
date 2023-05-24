import React from "react";
import PageMeta from "../components/PageMeta";
import PageTitle from "../components/PageTitle";
import Card from "../components/Card";
import Link from "next/link";
import { useCartContent } from "../contexts/CartContext";
import { useRouter } from "next/router";

export default function Subscribe() {
  const { newItem, addItem } = useCartContent();
  const router = useRouter();
  const addToCart = () => {
    // type, service, serviceID, price, number
    const item = newItem("订阅", "成为尊贵的订阅用户", 1, 1, 1);
    addItem(item);
    router.push("/cart");
  };
  return (
    <>
      <PageMeta>订阅</PageMeta>
      <PageTitle>订阅</PageTitle>

      <Card className="mx-3 mb-3 lg:mx-0">
        <div className="">
          <ul className="grid grid-cols-4 text-lg">
            <li className="font-semibold">权益</li>
            <li className="font-semibold">游客</li>
            <li className="font-semibold">普通用户</li>
            <li className="font-semibold text-orange-600">订阅用户</li>
          </ul>
          <ul className="grid grid-cols-4 my-1">
            <li></li>
            <li></li>
            <li className="font-semibold">$0/月</li>
            <li className="font-semibold">$1/月</li>
          </ul>
          <ul className="grid grid-cols-4 py-3">
            <li></li>
            <li></li>
            <li>
              <Link
                className="px-3 py-1 border hover:border-gray-300 hover:bg-gray-50"
                href="/register"
              >
                注册
              </Link>
            </li>
            <li>
              <button
                className="px-3 py-1  bg-orange-500 text-white hover:bg-orange-600 lg:font-normal lg:py-2 lg:px-6"
                onClick={addToCart}
              >
                订阅
              </button>
            </li>
          </ul>
          <ul className="grid grid-cols-4 border-y py-3">
            <li>人机验证</li>
            <li>HCaptcha 人机验证</li>
            <li>HCaptcha 人机验证</li>
            <li>可关闭人机验证</li>
          </ul>
          <ul className="grid grid-cols-4 border-b py-3">
            <li>多设备登录</li>
            <li>N/A</li>
            <li>只能在一个设备上登录</li>
            <li>最多可在三个设备上登录</li>
          </ul>
          <ul className="grid grid-cols-4 border-b py-3">
            <li>在线时长</li>
            <li>N/A</li>
            <li>强制每次在线20分钟</li>
            <li>最长可设置在线2小时(120分钟)</li>
          </ul>
          <ul className="grid grid-cols-4 border-b py-3">
            <li>付费专题</li>
            <li>不可查看</li>
            <li>购买后可查看</li>
            <li>特定收费专题免费查看；购买教程时享受折扣</li>
          </ul>
          <ul className="grid grid-cols-4 border-b py-3">
            <li>学习记录</li>
            <li>N/A</li>
            <li>可回顾最后5条学习记录</li>
            <li>可回顾所有学习记录</li>
          </ul>
          <ul className="grid grid-cols-4 border-b py-3">
            <li>积分</li>
            <li>N/A</li>
            <li>签到获取积分，积分可以用于兑换收费专题</li>
            <li>
              每次购买订阅赠送等比例积分、签到获取积分，积分可以用于兑换收费专题
            </li>
          </ul>
          <ul className="grid grid-cols-4 border-b py-3">
            <li>投稿</li>
            <li>N/A</li>
            <li>可进行投稿，稿件一旦接纳将获取积分奖励</li>
            <li>可进行投稿，稿件一旦接纳将获取积分奖励</li>
          </ul>
          <ul className="grid grid-cols-4 border-b py-3">
            <li>请求教程</li>
            <li>N/A</li>
            <li>可请求教程，每次消耗一定量的积分</li>
            <li>请求教程消耗的积分减半</li>
          </ul>

          <div className="my-3 text-gray-600 text-sm">
            *
            某些权益可能在当前版本中并未实现，我们将通过不断的版本迭代实现更多的权益。
          </div>
        </div>
      </Card>
    </>
  );
}
