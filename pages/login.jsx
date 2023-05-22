import React, { useRef, useState } from "react";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import Form from "../components/Form";
import PageMeta from "../components/PageMeta";
import TextField from "../components/Form/TextField";
import { SinLayout } from "../components/Layout";
import Link from "next/link";
import { useRouter } from "next/router";
import MsgBox from "../components/MsgBox";
import { post } from "../fetcher/fetcher";

const defaultMsg = {
  email: "输入你的邮箱地址",
  password: "请输入你的密码",
  response: "请完成人机验证",
};

export default function Login({ ip }) {
  const [input, setInput] = useState({
    email: "",
    password: "",
    response: "",
  });
  const [msg, setMsg] = useState({ ...defaultMsg });
  const [alterMsg, setAlterMsg] = useState("");

  const [isLoading, setLoading] = useState(false);
  const [msgIsErr, setMsgIsErr] = useState(false);
  const [isSuccess, setSuccess] = useState(false);

  const captchaRef = useRef();
  const router = useRouter();

  const onChangeHandler = (key) => {
    return (e) => {
      const v = e.target.value;
      setInput({ ...input, [key]: v });
    };
  };

  const loginHandler = async () => {
    setLoading(true);
    try {
      const res = await post("/../auth/user/login", { ...input, ip });
      // console.log(res);
      if (res?.code === 0) {
        setAlterMsg("登录成功");
        setSuccess(true);
        return;
      }
      if (res?.code !== 0) {
        if (res?.code === 9528) {
          setMsgIsErr(true);
          const msgArr = res?.msg.split("\n");
          // console.log(msgArr);
          const msgs = Object.fromEntries(
            msgArr.map((item) => {
              const [key, msg] = item.split(":");
              return [key, msg].map((v) => v.trim());
            })
          );
          // console.log(msgs);
          setMsg({ ...msgs });
          // setAlterMsg("你输入的数据有误，请检查后再提交");
        } else {
          setAlterMsg(res?.msg || "提交失败，请检查你的网络");
        }
      }
    } catch (e) {
      setAlterMsg("提交失败，请检查你的网络");
      console.log(e);
    } finally {
      setLoading(false);
      setInput({ ...input, response: "" });
      captchaRef.current.resetCaptcha();
    }
  };
  return (
    <>
      <PageMeta>用户登录</PageMeta>
      {/* <div>{JSON.stringify(ip)}</div> */}
      {alterMsg && (
        <MsgBox
          okHandler={() => {
            setAlterMsg("");
            if (isSuccess) {
              router.push("/user");
            }
          }}
          hasCancelButton={false}
        >
          {alterMsg}
        </MsgBox>
      )}
      <div className="mt-32 max-w-sm mx-auto border rounded shadow bg-white/80 lg:mt-48 lg:max-w-md">
        <div className="relative">
          <Form className="p-6" isLoading={isLoading} onSubmit={loginHandler}>
            <TextField
              label="邮箱"
              type="email"
              id="email"
              helpText={msg.email}
              isErrText={msgIsErr}
              onChange={onChangeHandler("email")}
              required
            />

            <TextField
              label="密码"
              type="password"
              id="password"
              helpText={msg.password}
              isErrText={msgIsErr}
              onChange={onChangeHandler("password")}
              required
            />

            <div className="mb-3">
              <HCaptcha
                sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_SITEKEY}
                ref={captchaRef}
                onVerify={(token, ekey) => {
                  setInput({ ...input, response: token });
                }}
              />
              <TextField.HelpText isErrText={msgIsErr}>
                {msg.response}
              </TextField.HelpText>
            </div>
            <div className="flex justify-between items-center space-x-4">
              <div className="flex flex-col text-sm">
                <Link
                  href="/register"
                  className="hover:text-blue-700 hover:underline"
                >
                  注册新用户
                </Link>
              </div>
              <button className="border rounded bg-blue-500 text-white border-blue-600 px-6 py-2 hover:bg-blue-600 hover:border-blue-700">
                登录
              </button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
}
Login.getLayout = SinLayout;

export async function getServerSideProps() {
  const res = await fetch("https://httpbin.org/ip", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  const { origin: ip } = await res.json();

  return { props: { ip } };
}
