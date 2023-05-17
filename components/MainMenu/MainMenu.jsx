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

export default function MainMenu({ className, open = false }) {
  const fullClassName = `${
    open ? "block" : "hidden"
  } fixed left-0 top-0 bg-white w-3/4 h-screen  z-20 shadow-md lg:static lg:w-full lg:bg-transparent lg:z-auto lg:shadow-none lg:block ${className}`;
  const thisYear = new Date().getFullYear();
  return (
    <>
      <Mask open={open} />
      <div className={fullClassName}>
        <div className="flex flex-col space-y-3 relative mt-14 bg-white py-3 h-full  lg:mt-6 lg:border lg:rounded-md lg:h-auto lg:divide-y">
          {/* 全局菜单 */}
          <ul className="py-1">
            <Item icon={<NewspaperIcon />} href="/subject">
              专题
            </Item>
            <Item icon={<DocumentDuplicateIcon />} href="/topic">
              文章
            </Item>
            <Item icon={<HashtagIcon />} href="/tag">
              标签
            </Item>
            <Item icon={<MagnifyingGlassIcon />} href="/search">
              搜索
            </Item>
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
          <ul className="py-1 pt-4 hidden lg:block">
            <Item icon={<CreditCardIcon />} isWidest={false}>
              订阅信息
            </Item>
            <Item icon={<DocumentTextIcon />} isWidest={false}>
              学习记录
            </Item>
            <Item icon={<UserIcon />} isWidest={false}>
              个人信息
            </Item>
            <Item icon={<KeyIcon />} isWidest={false}>
              修改密码
            </Item>
            <Item icon={<ArrowRightOnRectangleIcon />} isWidest={false}>
              退出登录
            </Item>
          </ul>
          {/* 社交媒体 */}
          <ul className="py-1 pt-4 px-1 flex space-x-3 justify-center items-center flex-wrap">
            <_SocialItem
              icon={<Blog />}
              href="https://s39x.com"
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
          <div className="py-1 pt-4 text-gray-500 text-xs text-center absolute bottom-16  w-full lg:static">
            &copy; 2021-{thisYear} <Link href="/">AXUM中文网</Link>
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
        className={`hidden group-hover:block absolute bg-white border border-gray-200 rounded-md shadow-md z-30 p-3 lg:-right-[7.5rem] lg:-top-[0.1rem]`}
      >
        <ul className="flex flex-col justify-center items-center">
          <li className="px-3 py-2">
            <Link
              href="/about"
              className="hover:text-red-600 tracking-widest font-normal"
            >
              关于我们
            </Link>
          </li>
          <li className="px-3 py-2">
            <Link
              href="user-rights"
              className="hover:text-red-600 tracking-widest font-normal"
            >
              用户权益
            </Link>
          </li>
          <li className="px-3 py-2">
            <Link
              href="donate"
              className="hover:text-red-600 tracking-widest font-normal"
            >
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
      <li
        className="group/secial relative rounded p-1 lg:hover:-translate-y-1 lg:transition-all"
        title={title}
      >
        <a href={href} target="_blank">
          {icon}
        </a>
        {/* <div className="hidden absolute p-3 bg-black/75 text-gray-100 min-w-[8.5rem] xl:group-hover/secial:block xl:z-1">
          {title}
        </div> */}
      </li>
    </>
  );
}
