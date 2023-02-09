import React from "react";
import Link from "next/link";
import {
  NewspaperIcon,
  DocumentDuplicateIcon,
  HashtagIcon,
  MagnifyingGlassIcon,
  ChevronDoubleRightIcon,
  BanknotesIcon,
  UserIcon,
  ArrowRightOnRectangleIcon,
  KeyIcon,
  DocumentTextIcon,
  CreditCardIcon,
} from "@heroicons/react/24/outline";
import Item from "./Item";
import Mask from "./Mask";
import { Blog, Email, Github, Telegram, Youtube } from "../Icons/Bootstrap";

export default function MainMenu({ className, open = true }) {
  const fullClassName = `${
    open ? "block" : "hidden"
  } fixed left-0 top-0 bg-white w-3/4 h-screen  z-20 shadow-md md:static md:w-full md:bg-transparent md:z-auto md:shadow-none md:block ${className}`;
  return (
    <>
      <Mask open={open} />
      <div className={fullClassName}>
        <div className="flex flex-col space-y-3 relative mt-14 bg-white py-3 h-full  md:mt-6 md:border md:rounded-md md:h-auto md:divide-y">
          {/* 全局菜单 */}
          <ul className="py-1">
            <Item icon={<NewspaperIcon />}>专题</Item>
            <Item icon={<DocumentDuplicateIcon />}>文章</Item>
            <Item icon={<HashtagIcon />}>标签</Item>
            <Item icon={<MagnifyingGlassIcon />}>探索</Item>
            <Item icon={<BanknotesIcon />}>订阅</Item>
            <Item
              icon={<ChevronDoubleRightIcon />}
              isButton
              isRelative
              isGroup
              ext={<_MoreMenuPop />}
            >
              更多
            </Item>
          </ul>
          {/* 用户中心-已登录 */}
          <ul className="py-1 pt-4 hidden md:block">
            <Item icon={<CreditCardIcon />}>订阅信息</Item>
            <Item icon={<DocumentTextIcon />}>学习记录</Item>
            <Item icon={<UserIcon />}>个人信息</Item>
            <Item icon={<KeyIcon />}>修改密码</Item>
            <Item icon={<ArrowRightOnRectangleIcon />}>退出登录</Item>
          </ul>
          {/* 社交媒体 */}
          <ul className="py-1 pt-4 flex space-x-3 justify-center items-center">
            <_SocialItem
              icon={<Blog />}
              href="https://axum.eu.org"
              title="浏览我们的博客"
            />
            <_SocialItem
              icon={<Github />}
              href="https://github.com/axumrs"
              title="访问我们的Github仓库"
            />
            <_SocialItem
              icon={<Email />}
              href="mailto:team@axum.rs"
              title="通过Email联系我们"
            />
            <_SocialItem
              icon={<Telegram />}
              href="https://t.me/axumrs"
              title="加入我们的TG群"
            />
            <_SocialItem
              icon={<Youtube />}
              href="https://www.youtube.com/channel/UCxYIyGnTIXK3oXgqZhZPpYQ"
              title="访问我们的YTB频道"
            />
          </ul>
          {/* 版权 */}
          <div className="py-1 pt-4 text-gray-600 text-sm text-center absolute bottom-16  w-full md:static">
            &copy; 2023 <Link href="/">AXUM中文网</Link>
          </div>
        </div>
      </div>
    </>
  );
}

function _MoreMenuPop() {
  return (
    <>
      <div
        className={`hidden group-hover:block absolute bg-white border border-gray-200 rounded-md shadow-md z-30 p-3 md:-right-[7.5rem] md:-top-[0.1rem]`}
      >
        <ul className="flex flex-col justify-center items-center">
          <li className="px-3 py-2">
            <Link href="" className="hover:text-red-600 tracking-widest">
              关于我们
            </Link>
          </li>
          <li className="px-3 py-2">
            <Link href="" className="hover:text-red-600 tracking-widest">
              用户权益
            </Link>
          </li>
          <li className="px-3 py-2">
            <Link href="" className="hover:text-red-600 tracking-widest">
              捐助我们
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}

function _SocialItem({ icon, href, title }) {
  return (
    <>
      <li className="group/secial relative rounded p-1 md:hover:-translate-y-1 md:transition-all">
        <a href={href} target="_blank">
          {icon}
        </a>
        <div className="hidden absolute p-3 bg-black/70 text-gray-100 min-w-[8.5rem] md:group-hover/secial:block">
          {title}
        </div>
      </li>
    </>
  );
}
