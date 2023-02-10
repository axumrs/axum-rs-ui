import React from "react";
import PageMeta from "../components/PageMeta";
import { SinLayout } from "../components/Layout";
export default function Login() {
  return (
    <>
      <PageMeta>用户登录</PageMeta>
      <h1>登录页</h1>
    </>
  );
}
Login.getLayout = SinLayout;
