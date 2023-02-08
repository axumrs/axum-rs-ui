import Link from "next/link";
import React from "react";

export default function A(props) {
  const { isExternal } = props;

  if (isExternal) {
    return <a {...props}>{props.children}</a>;
  }
  return <Link {...props} />;
}
