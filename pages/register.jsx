import React, { useRef, useState } from "react";
import Form from "../components/Form";
import PageMeta from "../components/PageMeta";
import { SinLayout } from "../components/Layout";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import Link from "next/link";
import TextField from "../components/Form/TextField";
import { post } from "../fetcher/fetcher";
import MsgBox from "../components/MsgBox";
import { useRouter } from "next/router";

const defaultMsg = {
  email: "输入你的邮箱地址",
  nickname: "昵称长度介于3-30个字符",
  password: "请设置至少6位的密码",
  re_password: "请再次输入你的密码",
  response: "请完成人机验证",
};

export default function Register() {
  const [input, setInput] = useState({
    email: "",
    nickname: "",
    password: "",
    re_password: "",
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
  const submiter = async () => {
    setLoading(true);
    setMsg({ ...defaultMsg });
    setMsgIsErr(false);
    setAlterMsg("");
    setSuccess(false);
    try {
      const res = await post("/../auth/user/register", { ...input });
      // console.log(res);
      if (res?.code === 0) {
        setAlterMsg("恭喜，注册成功");
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
      <PageMeta>用户注册</PageMeta>
      {alterMsg && (
        <MsgBox
          okHandler={() => {
            setAlterMsg("");
            if (isSuccess) {
              router.push("/login");
            }
          }}
          hasCancelButton={false}
        >
          {alterMsg}
        </MsgBox>
      )}
      <div className="relative mt-32 max-w-sm mx-auto border rounded shadow bg-white/80 lg:mt-32 lg:max-w-md">
        <Form className="p-6" onSubmit={submiter} isLoading={isLoading}>
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
            label="昵称"
            type="text"
            id="nickname"
            helpText={msg.nickname}
            onChange={onChangeHandler("nickname")}
            isErrText={msgIsErr}
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
          <TextField
            label="重复密码"
            type="password"
            id="re_password"
            helpText={msg.re_password}
            isErrText={msgIsErr}
            onChange={onChangeHandler("re_password")}
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
                href="/login"
                className="hover:text-blue-700 hover:underline"
              >
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
