"use client";

import React, { useState } from "react";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function User() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <UserAction
        open={open}
        setOpen={() => {
          setOpen(!open);
        }}
      />
    </>
  );
}

function UserAction({
  open = false,
  setOpen = () => {},
}: {
  open: boolean;
  setOpen: () => void;
}) {
  const openCss = open ? "block" : "hidden";
  return (
    <>
      <div className="relative">
        <UserCircleIcon
          className="w-6 h-6 lg:w-8 lg:h-8 cursor-pointer"
          onClick={() => {
            setOpen();
          }}
        />
        <ul
          className={`absolute z-10 bg-white border p-1 flex flex-col justify-center items-center space-y-1 shadow w-24 -left-8 rounded lg:p-3 ${openCss}`}
        >
          <UserActionItem onClick={setOpen} href="/user">
            个人中心
          </UserActionItem>
          <UserActionItem onClick={setOpen} href="/user/order">
            订单列表
          </UserActionItem>
          <UserActionItem onClick={setOpen} href="/user/purchased_service">
            已购项目
          </UserActionItem>
          <UserActionItem onClick={setOpen} href="/user/history">
            学习记录
          </UserActionItem>
          <UserActionItem onClick={setOpen} href="/user/profile">
            个人信息
          </UserActionItem>
          <UserActionItem onClick={setOpen} href="/user/changepwd">
            修改密码
          </UserActionItem>
          <UserActionItem onClick={setOpen} href="/user/logout">
            退出登录
          </UserActionItem>
        </ul>
      </div>
    </>
  );
}

function UserActionItem({
  children,
  href = "",
  onClick = () => {},
}: ChildrenProps & {
  href: string;
  onClick: () => void;
}) {
  return (
    <li className="">
      <Link href={href} onClick={onClick} className="hover:underline">
        {children}
      </Link>
    </li>
  );
}
