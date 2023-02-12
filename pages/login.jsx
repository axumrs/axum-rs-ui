import React from "react";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import Form from "../components/Form";
import PageMeta from "../components/PageMeta";
import TextField from "../components/Form/TextField";
import { SinLayout } from "../components/Layout";
import Link from "next/link";
export default function Login() {
  return (
    <>
      <PageMeta>用户登录</PageMeta>
      <div className="mt-32 max-w-sm mx-auto border rounded shadow bg-white/80 lg:mt-48 lg:max-w-md">
        <Form className="p-6">
          <TextField label="邮箱" type="email" id="email" required />
          <TextField label="密码" type="password" id="password" required />

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
                忘记密码
              </Link>
              <Link href="" className="hover:text-blue-700 hover:underline">
                注册新用户
              </Link>
            </div>
            <button className="border rounded bg-blue-500 text-white border-blue-600 px-6 py-2 hover:bg-blue-600 hover:border-blue-700">
              登录
            </button>
          </div>
        </Form>
      </div>
    </>
  );
}
Login.getLayout = SinLayout;
