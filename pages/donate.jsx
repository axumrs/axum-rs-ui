import React from "react";
import PageMeta from "../components/PageMeta";
import PageTitle from "../components/PageTitle";
import Card from "../components/Card";

export default function Donate() {
  return (
    <>
      <PageMeta>捐助我们</PageMeta>
      <PageTitle>捐助我们</PageTitle>
      <Card className="mx-3 my-3 lg:mx-0">
        <div className="prose max-w-none lg:prose-xl p-3 lg:p-6">
          <p>
            如果你觉得我们的教程给你带来了帮助，可以小额捐助，以支持我们继续提供更优质的服务。
          </p>
          <h2>USDT / TRX</h2>
          <p>
            钱包地址：<code>TPGEtKJmPJU3naosCcRrVReE2ckFhE9sYM</code>
          </p>
          <p>
            <img
              src="https://file.axum.rs/pay/tron1.png"
              alt="钱包二维码"
              className="w-40 object-cover border rounded p-1 lg:w-64"
            />
          </p>
          <h2>支付宝</h2>
          <p>
            <img
              src="https://file.axum.rs/pay/alipay.jpg"
              alt="支付宝"
              className="w-40 object-cover border rounded p-1 lg:w-64"
            />
          </p>
        </div>
      </Card>
    </>
  );
}
