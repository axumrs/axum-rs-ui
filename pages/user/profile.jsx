import React, { useEffect, useState } from "react";
import PageMeta from "../../components/PageMeta";
import PageTitle from "../../components/PageTitle";
import Card from "../../components/Card";
import Toast, { ToastDefaultOption } from "../../components/Toast";
import { useRouter } from "next/router";
import Form from "../../components/Form";
import Loading from "../../components/Loading";
import { geta, posta } from "../../fetcher/fetcher";

export default function UserProfile() {
  const [input, setInput] = useState({});
  const [toast, setToast] = useState({ ...ToastDefaultOption });
  const [isSubmiting, setSubmiting] = useState(false);
  const [reload, setReload] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const router = useRouter();

  const onChangeHandler = (key) => (e) => {
    const v = e.target.value;
    setInput({ ...input, [key]: v });
  };

  const submitHanlder = async () => {
    try {
      setSubmiting(true);
      const allow_device_num = parseInt(input.allow_device_num, 10) || 1;
      const jwt_exp = parseInt(input.jwt_exp, 10) || 0;
      const res = await posta("/user/profile", {
        ...input,
        jwt_exp,
        allow_device_num,
      });
      if (res?.code === 0) {
        setToast({ type: "success", msg: "恭喜，资料修改成功" });
        setReload(true);
        return;
      }
      if (res?.code === 9527) {
        router.push(`/login?r=/user/profile`);
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
      if (res?.code === 9530) {
        setToast({ type: "error", msg: res?.msg });
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

  useEffect(() => {
    setLoading(true);

    geta("/user/profile")
      .then((res) => {
        if (res?.code === 0) {
          const { data } = res;
          setInput({ ...data, password: "" });
          return;
        }
        if (res?.code === 9527) {
          router.push(`/login?r=/user/profile`);
          return;
        }

        if (res?.code !== 0) {
          setToast({ type: "error", msg: "操作失败，请检查你的网络" });
          return;
        }
      })
      .catch((e) => {
        console.log(e);
        setToast({ type: "error", msg: "操作失败，请检查你的网络" });
      })
      .finally(() => {
        setLoading(false);
      });
  }, [reload]);

  return (
    <>
      <PageMeta>个人信息</PageMeta>
      <PageTitle>个人信息</PageTitle>

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
      {isLoading && <Loading />}

      <Card className="mx-3 lg:mx-0">
        <div className="relative p-3">
          <Form
            className="grid grid-cols-1 gap-6"
            isLoading={isSubmiting}
            onSubmit={submitHanlder}
          >
            <label className="block">
              <span className="text-gray-700 before:text-red-600 before:content-['*'] before:mr-1 before:text-sm">
                Email
              </span>
              <input
                type="email"
                className="
                    form-input
                    mt-0
                    block
                    w-full
                    px-0.5
                    border-0 border-b-2 border-gray-200
                    focus:ring-0 focus:border-black
                  "
                placeholder="输入邮箱"
                required
                onChange={onChangeHandler("email")}
                value={input?.email}
              />
            </label>
            <label className="block">
              <span className="text-gray-700 before:text-red-600 before:content-['*'] before:mr-1 before:text-sm">
                昵称
              </span>
              <input
                type="text"
                className="
                    form-input
                    mt-0
                    block
                    w-full
                    px-0.5
                    border-0 border-b-2 border-gray-200
                    focus:ring-0 focus:border-black
                  "
                placeholder="输入昵称"
                required
                onChange={onChangeHandler("nickname")}
                value={input?.nickname}
              />
            </label>

            <label className="block">
              <span className="text-gray-700 before:text-red-600 before:content-['*'] before:mr-1 before:text-sm">
                同时登录设备数
              </span>
              <input
                type="number"
                className="
                    form-input
                    mt-0
                    block
                    w-full
                    px-0.5
                    border-0 border-b-2 border-gray-200
                    focus:ring-0 focus:border-black
                  "
                placeholder="设置允许同时登录的设备数"
                required
                min="1"
                max="3"
                onChange={onChangeHandler("allow_device_num")}
                value={input?.allow_device_num}
              />
              <div className="text-gray-500 text-xs">
                订阅用户最大可设置3台，普通用户该项设置无效。
              </div>
            </label>
            <label className="block">
              <span className="text-gray-700 before:text-red-600 before:content-['*'] before:mr-1 before:text-sm">
                会话超时时间
              </span>
              <input
                type="number"
                className="
                    form-input
                    mt-0
                    block
                    w-full
                    px-0.5
                    border-0 border-b-2 border-gray-200
                    focus:ring-0 focus:border-black
                  "
                placeholder="设置会话超时时间"
                max="120"
                min="0"
                required
                onChange={onChangeHandler("jwt_exp")}
                value={input?.jwt_exp}
              />
              <div className="text-gray-500 text-xs">
                设置为0，表示使用系统默认时长，单位为分钟。订阅用户最大可设置120分钟，普通用户该项设置无效。
              </div>
            </label>

            <label className="block">
              <span className="text-gray-700 before:text-red-600 before:content-['*'] before:mr-1 before:text-sm">
                密码
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
                placeholder="输入密码"
                required
                onChange={onChangeHandler("password")}
                value={input?.password}
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
                  setReload(true);
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
