import Link from "next/link";
import React, { useEffect, useState } from "react";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import { getToken } from "../../utils/cookie";

export default function User() {
  const [token, setToken] = useState("");

  const [open, setOpen] = useState(false);

  useEffect(() => {
    const token = getToken();
    setToken(token);
  }, [open]);

  if (!token) {
    return (
      <>
        <NoAuth />
      </>
    );
  }
  return (
    <UserActions
      open={open}
      setOpen={() => {
        setOpen(!open);
      }}
    />
  );
}

function NoAuth() {
  return (
    <>
      <Link
        href="/register"
        className="py-1 px-3 border rounded-full hidden lg:inline-block hover:bg-gray-50 hover:border-gray-300"
      >
        注册
      </Link>
      <Link
        href="/login"
        className="py-1 px-3 border rounded-full bg-blue-500 text-white border-blue-600 hover:bg-blue-600"
      >
        登录
      </Link>
    </>
  );
}

function UserActions({ open = false, setOpen = () => {} }) {
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
          <UserActionItem onClick={setOpen} href="/user/subscribe">
            订阅信息
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
function UserActionItem({ children, href = "", onClick = () => {} }) {
  return (
    <li className="">
      <Link href={href} onClick={onClick} className="hover:underline">
        {children}
      </Link>
    </li>
  );
}
