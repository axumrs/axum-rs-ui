import React, { useState } from "react";
import PageMeta from "../../components/PageMeta";
import PageTitle from "../../components/PageTitle";
import Card from "../../components/Card";
import Toast, { ToastDefaultOption } from "../../components/Toast";
// import Loading from "../../components/Loading";
import Form from "../../components/Form";
import { posta } from "../../fetcher/fetcher";
import { useRouter } from "next/router";

const defaultInputData = {
  new_password: "",
  re_password: "",
  password: "",
};
export default function UserChangePassword() {
  const [input, setInput] = useState({ ...defaultInputData });
  const [toast, setToast] = useState({ ...ToastDefaultOption });
  const [isSubmiting, setSubmiting] = useState(false);
  const router = useRouter();

  const onChangeHandler = (key) => (e) => {
    const v = e.target.value;
    setInput({ ...input, [key]: v });
  };

  const submitHanlder = async () => {
    try {
      if (input.new_password.length < 6) {
        setToast({ type: "error", msg: "新密码至少需要6个字符" });
        return;
      }
      if (input.re_password !== input.new_password) {
        setToast({ type: "error", msg: "两次输入的密码不一致" });
        return;
      }
      if (input.password.length < 6) {
        setToast({ type: "error", msg: "当前密码至少需要6个字符" });
        return;
      }
      if (input.password === input.new_password) {
        setToast({ type: "error", msg: "玩呢？改一样的密码" });
        return;
      }
      setSubmiting(true);
      const res = await posta("/user/change-pwd", { ...input });
      if (res?.code === 0) {
        setToast({ type: "success", msg: "恭喜，密码修改成功" });
        setInput({ ...defaultInputData });
        return;
      }
      if (res?.code === 9527) {
        router.push(`/login?r=/user/changepwd`);
        return;
      }
      if (res?.code === 9528) {
        setToast({ type: "error", msg: "表单输入有误，请检查你的输入" });
        return;
      }
      if (res?.code === 9529) {
        setToast({ type: "error", msg: "你输入的当前密码错误" });
        return;
      }
      if (res?.code !== 0) {
        setToast({ type: "error", msg: "操作失败，请检查你的网络" });
        return;
      }
    } catch (e) {
      console.log(e);
      setToast({ type: "error", msg: "操作失败，请检查你的网络" });
    } finally {
      setSubmiting(false);
    }
  };
  return (
    <>
      <PageMeta>修改密码</PageMeta>
      <PageTitle>修改密码</PageTitle>

      {toast.msg && (
        <Toast
          type={toast.type}
          callback={() => {
            setToast({ ...toast, msg: "" });
          }}
        >
          {toast.msg}
        </Toast>
      )}

      <Card className="mx-3 lg:mx-0">
        <div className="relative p-3">
          <Form
            className="grid grid-cols-1 gap-6"
            isLoading={isSubmiting}
            onSubmit={submitHanlder}
          >
            <label className="block">
              <span className="text-gray-700 before:text-red-600 before:content-['*'] before:mr-1 before:text-sm">
                新密码
              </span>
              <input
                type="password"
                className="
                    form-input
                    mt-0
                    block
                    w-full
                    px-0.5
                    border-0 border-b-2 border-gray-200
                    focus:ring-0 focus:border-black
                  "
                placeholder="输入新密码"
                required
                onChange={onChangeHandler("new_password")}
                value={input.new_password}
              />
            </label>

            <label className="block">
              <span className="text-gray-700 before:text-red-600 before:content-['*'] before:mr-1 before:text-sm">
                重复新密码
              </span>
              <input
                type="password"
                className="
                    form-input
                    mt-0
                    block
                    w-full
                    px-0.5
                    border-0 border-b-2 border-gray-200
                    focus:ring-0 focus:border-black
                  "
                placeholder="再次输入新密码"
                required
                onChange={onChangeHandler("re_password")}
                value={input.re_password}
              />
            </label>

            <label className="block">
              <span className="text-gray-700 before:text-red-600 before:content-['*'] before:mr-1 before:text-sm">
                当前密码
              </span>
              <input
                type="password"
                className="
                    form-input
                    mt-0
                    block
                    w-full
                    px-0.5
                    border-0 border-b-2 border-gray-200
                    focus:ring-0 focus:border-black
                  "
                placeholder="输入当前使用的密码"
                required
                onChange={onChangeHandler("password")}
                value={input.password}
              />
            </label>

            <div
              className="mt-0
                    w-full
                    px-0.5
                    flex justify-end items-start space-x-3"
            >
              <button
                type="submit"
                className="bg-blue-500 px-6 py-2 border  rounded text-white border-blue-600 hover:bg-blue-600 inline-block"
              >
                提交
              </button>
              <button
                type="reset"
                className="bg-white px-6 py-2 border  rounded text-gray-600 border-gray-400 hover:bg-gray-100 inline-block"
                onClick={() => {
                  setInput({ ...defaultInputData });
                }}
              >
                重置
              </button>
            </div>
          </Form>
        </div>
      </Card>
    </>
  );
}
