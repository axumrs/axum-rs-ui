import React, { useRef } from "react";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import Link from "next/link";
import Loading from "./Loading";

export default function CaptchaForTopic({
  callback = (token, ekey, ref) => {},
  isLoading = false,
}) {
  const ref = useRef();
  return (
    <>
      <div className="fixed inset-0 z-[99] bg-[#000]/75">
        <div className="absolute p-3  bg-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border rounded-md shadow-md shadow-gray-600/75 lg:p-8">
          {isLoading && <Loading />}
          <div className="grid grid-col-1 gap-3 lg:gap-6">
            <div className="font-semibold text-lg">
              要查看完整内容，请完成人机验证
            </div>
            <div>
              <HCaptcha
                sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_SITEKEY}
                ref={ref}
                onVerify={(token, ekey) => {
                  callback(token, ekey, ref);
                }}
              />
            </div>
            <div className="text-gray-600">
              <Link
                href="/subscribe"
                className="underline decoration-dashed hover:text-blue-600"
              >
                升级为订阅用户
              </Link>
              ，可关闭人机验证。
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
