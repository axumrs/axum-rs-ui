import React from "react";
import Loading from "../Loading";

export default function Form(props) {
  const {
    onSubmit = (e) => {
      console.log(e);
    },
    children = <></>,
    action = "",
    method = "post",
    enableAutoComplete = false,
    isLoading = false,
    loadingText = "正在提交，请稍候",
    ...others
  } = props;
  return (
    <form
      action={action}
      method={method}
      {...others}
      onSubmit={(e) => {
        e.preventDefault();
        return onSubmit(e);
      }}
      autoComplete={enableAutoComplete ? "on" : "off"}
    >
      {isLoading && <Loading>{loadingText}</Loading>}
      {children}
    </form>
  );
}
