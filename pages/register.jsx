import React, { useState } from "react";
import Form from "../components/Form";
import PageMeta from "../components/PageMeta";
import { SinLayout } from "../components/Layout";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import Link from "next/link";
import TextField from "../components/Form/TextField";

export default function Register() {
  const [foo, setFoo] = useState("");
  const submiter = (e) => {
    window.alert("submit: " + foo);
  };
  const fooHandler = (e) => {
    setFoo(e.target.value);
  };
  return (
    <>
      <PageMeta>用户注册</PageMeta>
      <div className="mt-32 max-w-sm mx-auto border rounded shadow bg-white/80 lg:mt-48 lg:max-w-md">
        <Form className="p-6" onSubmit={submiter}>
          <TextField label="邮箱" type="email" id="email" required />
          <TextField label="昵称" type="text" id="nickname" required />
          <TextField label="密码" type="password" id="password" required />
          <TextField
            label="重复密码"
            type="password"
            id="re-password"
            required
          />

          <div className="mb-3">
            <HCaptcha
              sitekey="10000000-ffff-ffff-ffff-000000000001"
              onVerify={(token, ekey) =>
                console.log([token, ekey].join(" --- "))
              }
            />
          </div>
          <div className="flex justify-between items-center space-x-4">
            <div className="flex flex-col text-sm">
              <Link href="" className="hover:text-blue-700 hover:underline">
                登录已有账号
              </Link>
            </div>
            <button className="border rounded bg-blue-500 text-white border-blue-600 px-6 py-2 hover:bg-blue-600 hover:border-blue-700">
              注册
            </button>
          </div>
        </Form>
      </div>
    </>
  );
}

Register.getLayout = SinLayout;
