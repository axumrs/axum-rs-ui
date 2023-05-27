import React, { useEffect, useState } from "react";

export default function Toast({
  type = "default",
  duration = 5000,
  children = <></>,
  className = "",
  callback = () => {},
}) {
  let css = "from-blue-600 to-blue-700 text-white border-blue-700";
  switch (type) {
    case "success":
      css = "from-green-600 to-green-700 text-white border-green-700";
      break;
    case "warning":
      css = "from-yellow-600 to-yellow-700 text-white border-orange-700";
      break;
    case "error":
      css = "from-red-600 to-red-700 text-white border-red-700";
      break;
  }

  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
      clearTimeout(timer);
      callback();
    }, duration);
  });
  if (!show) {
    return <></>;
  }
  return (
    <div
      className={`fixed z-[101] top-0 left-[50%] px-3 py-1 border rounded-md shadow-md bg-gradient-to-b  -translate-x-1/2  translate-y-[10%] ${css} text-sm ${className}`}
    >
      {children}
    </div>
  );
}

Toast.Success = (props) => <Toast {...props} type="success" />;
Toast.Warning = (props) => <Toast {...props} type="warning" />;
Toast.Error = (props) => <Toast {...props} type="error" />;

export const ToastDefaultOption = { type: "default", msg: "" };
