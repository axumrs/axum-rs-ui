import React, { useEffect, useState } from "react";
import Card from "../../../components/Card";
import PageMeta from "../../../components/PageMeta";
import Link from "next/link";
import {
  NewspaperIcon,
  EyeIcon,
  CalendarDaysIcon,
  TagIcon,
} from "@heroicons/react/24/outline";
import "highlight.js/styles/github.css";
import hljs from "highlight.js";
import { geta, posta } from "../../../fetcher/fetcher";
import datelineFormat from "../../../utils/dtf";
import { getTokenSSR } from "../../../utils/cookie";
import code from "../../../utils/code";
import { useCartContext } from "../../../contexts/CartContext";
import { useRouter } from "next/router";
import {
  CurrencyDollarIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/solid";
import CaptchaForTopic from "../../../components/CaptchaForTopic";
import Toast, { ToastDefaultOption } from "../../../components/Toast";

export default function TopicDetail({ resp }) {
  const {
    data: { detail: topic, protect_ids, captcha_type },
  } = resp;

  const [showCaptcha, setShowCaptcha] = useState(false);
  const [toast, setToast] = useState({ ...ToastDefaultOption });
  const [captchaIsLoading, setCaptchaLoading] = useState(false);
  const [protectedContentList, setProtectedContentList] = useState([]);

  function domInjector() {
    document.querySelectorAll(".prose pre").forEach((pre) => {
      pre.classList.add("pre");
    });
    document.querySelectorAll(".prose a").forEach((link) => {
      link.setAttribute("target", "_blank");
    });
    hljs.highlightAll();
  }
  useEffect(() => {
    domInjector();
  }, []);

  useEffect(() => {
    document.querySelectorAll(".protected_content").forEach((e) => {
      e.classList.add("protected_content");
      e.addEventListener("click", () => {
        setShowCaptcha(true);
      });
    });
  }, []);

  useEffect(() => {
    setShowCaptcha(
      captcha_type !== "WithOut" && protect_ids && protect_ids.length > 0
    );
  }, []);

  useEffect(() => {
    if (protectedContentList && protectedContentList.length > 0) {
      protectedContentList.map(({ id, content }) => {
        const element = document.getElementById(`protected_content_${id}`);
        const e = document.createElement("div");
        e.innerHTML = content;
        element.parentElement.insertBefore(e, element);
        element.parentElement.removeChild(element);
      });
      domInjector();
    }
  }, [protectedContentList]);

  function fetchProtectdContent(token, ekey, ref) {
    setCaptchaLoading(true);
    posta("/topic/protected-content", { response: token, protect_ids })
      .then((res) => {
        const resCode = res?.code;
        if (resCode === code.OK) {
          setProtectedContentList([...res.data]);
          setToast({ type: "success", msg: "内容获取成功" });
          return;
        }
        setToast({ type: "error", msg: res?.msg });
      })
      .catch((e) => {
        setToast({ type: "error", msg: "操作失败，请检查你的网络" });
        console.log(e);
      })
      .finally(() => {
        setShowCaptcha(false);
        setCaptchaLoading(false);
        ref.current.resetCaptcha();
      });
  }

  return (
    <>
      <>
        <PageMeta>{`${topic?.title} - ${topic?.subject_name}`}</PageMeta>
        {showCaptcha && (
          <CaptchaForTopic
            callback={fetchProtectdContent}
            isLoading={captchaIsLoading}
          />
        )}
        {toast.msg && (
          <Toast
            {...toast}
            callback={() => setToast({ ...ToastDefaultOption })}
          >
            {toast.msg}
          </Toast>
        )}
        {/* <div>{JSON.stringify(protectedContentList)}</div> */}
        {topic?.cover && (
          <div className="mb-3 mx-3 lg:mx-0">
            <img
              src={topic?.cover}
              className="w-full object-cover rounded-md border"
              alt={topic?.title}
            />
          </div>
        )}

        <Card className="mx-3 lg:mx-0">
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-xl font-bold lg:text-3xl lg:font-extrabold">
              {topic?.title}
            </h1>
            <div className="flex justify-start items-center text-gray-600 text-sm space-x-1 my-3">
              <span>
                <NewspaperIcon className="w-4 h-4" />
              </span>
              <Link
                href={`/subject/${topic?.subject_slug}`}
                className="hover:underline hover:decoration-dotted hover:text-gray-700"
              >
                {topic?.subject_name}
              </Link>
            </div>
            <div className="flex justify-start items-center text-gray-500 text-xs space-x-2">
              <div className="flex justify-start items-center space-x-1">
                <span>
                  <EyeIcon className="w-4 h-4" />
                </span>
                <span>{topic?.hit}</span>
              </div>
              <div className="flex justify-start items-center space-x-1">
                <span>
                  <CalendarDaysIcon className="w-4 h-4" />
                </span>
                <span>{datelineFormat(topic?.dateline)}</span>
              </div>
            </div>
            <div className="flex justify-start items-center text-gray-500 text-xs space-x-1 mt-3">
              <span>
                <TagIcon className="w-4 h-4" />
              </span>
              {topic &&
                topic.tag_names &&
                topic?.tag_names
                  .split(",")
                  .filter((t) => t.trim().length > 0)
                  .map((t) => (
                    <Link
                      key={`topic-${topic?.id}-tag-${t}`}
                      className="before:content-['#'] hover:underline hover:decoration-dashed"
                      href={`/tag/${t}`}
                    >
                      {t}
                    </Link>
                  ))}
            </div>
          </div>
        </Card>

        <Card className="my-3 mx-3 lg:mx-0">
          {resp?.code === code.OK ? (
            <TopicNormalHtml topic={topic} />
          ) : (
            <NeedPurchased topic={topic} />
          )}
        </Card>
      </>
    </>
  );
}

export async function getServerSideProps({ params, req, res }) {
  const { subject_slug, slug } = params;
  const token = getTokenSSR({ req, res });

  const resp = await geta(`/topic/${subject_slug}/${slug}`, token);

  return { props: { resp } };
}

function TopicNormalHtml({ topic }) {
  return (
    <div
      dangerouslySetInnerHTML={{ __html: topic?.html }}
      className="prose max-w-none lg:prose-xl"
    ></div>
  );
}

function NeedPurchased({ topic }) {
  const { newItem, addItem } = useCartContext();
  const router = useRouter();

  const addToCart = (s) => {
    return () => {
      // type, service, serviceID, price, number
      const item = newItem(
        "专题",
        s.subject_name,
        s.subject_id,
        s.price / 100,
        1
      );
      addItem(item);
      router.push("/cart");
    };
  };
  return (
    <>
      <div className="flex flex-col space-y-4 justify-center items-center">
        <div className="text-lg text-cyan-600 font-semibold">
          {topic?.subject_name}
        </div>
        <div>你需要购买此专题才能查看本文内容</div>
      </div>
      <div className="mt-6 flex justify-center items-center space-x-1">
        <div className="flex justify-start items-center space-x-1 text-red-600 rounded px-2 py-1 border border-red-600">
          <span>价格：</span>
          <CurrencyDollarIcon className="w-4 h-4" />
          <span className="">{topic.price / 100}</span>
        </div>
        <button
          className="border border-blue-700 text-white bg-blue-600 px-2 py-1 rounded flex justify-start items-center space-x-1"
          onClick={addToCart({ ...topic })}
        >
          <ShoppingCartIcon className="w-6 h-6" />
          <span className="border-l pl-2 ml-2">立即购买</span>
        </button>
      </div>
    </>
  );
}
