import React from "react";
import A from "../A";

export default function NavItem(props) {
  return (
    <li>
      <A {...props} />
    </li>
  );
}
