import React from "react";
import ReactDOM from "react-dom/client";

export default function MsgBox({
  children = <></>,
  hasCancelButton = true,
  okHandler = (e) => {},
  cancelHandler = (e) => {},
  cancelText = "取消",
  okText = "确定",
}) {
  return (
    <div className="fixed inset-0 w-screen h-screen bg-gray-900/50 z-[100] flex flex-col justify-center items-center">
      <div className="w-[90%] max-w-md p-6 border bg-white rounded-md shadow-md">
        <div className="flex justify-start items-center space-x-1">
          <img
            src="https://file.axum.rs/asset/logo.png"
            className="w-4 h-4 grayscale"
          />
          <span>提示信息</span>
        </div>
        <div className="min-h-[4rem] my-6 text-lg">{children}</div>
        <div className="flex justify-end items-center space-x-2">
          {hasCancelButton && (
            <DefaultButton onClick={cancelHandler}>{cancelText}</DefaultButton>
          )}
          <PrimaryButton onClick={okHandler}>{okText}</PrimaryButton>
        </div>
      </div>
    </div>
  );
}

export function message() {
  const dom = document.createElement("div");
  document.body.appendChild(dom);
  ReactDOM.createRoot(dom).render(<MsgBox></MsgBox>);
}

function Button({ children, className = "", ...other }) {
  return (
    <button
      className={`border rounded px-3 py-1 text-sm ${className}`}
      {...other}
    >
      {children}
    </button>
  );
}

function PrimaryButton({ children, className = "", ...other }) {
  return (
    <Button
      className={`bg-blue-500 text-white border-blue-600  hover:bg-blue-600 hover:border-blue-700 ${className}`}
      {...other}
    >
      {children}
    </Button>
  );
}
function DefaultButton({ children, className = "", ...other }) {
  return (
    <Button
      className={`bg-white text-gray-600 hover:bg-gray-50 ${className}`}
      {...other}
    >
      {children}
    </Button>
  );
}
