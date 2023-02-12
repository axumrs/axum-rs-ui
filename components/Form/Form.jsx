import React from "react";

export default function Form(props) {
  const {
    onSubmit = (e) => {
      console.log(e);
    },
    children = <></>,
    action = "",
    method = "post",
    enableAutoComplete = false,
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
      {children}
    </form>
  );
}
