import React from "react";

export default function Form(props) {
  const {
    submiter = (e) => {
      console.log(e);
    },
    children = <></>,
    action = "",
    method = "post",
    ...others
  } = props;
  return (
    <form
      action={action}
      method={method}
      {...others}
      onSubmit={(e) => {
        e.preventDefault();
        return submiter(e);
      }}
    >
      {children}
    </form>
  );
}
