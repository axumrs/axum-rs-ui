import Link from "next/link";
import React from "react";
import { useMainMenuContext } from "../../contexts/MainMenuContext";

export default function Item(props) {
  const {
    children,
    href = "",
    icon,
    isRelative = false,
    isGroup = false,
    isWidest = true,
    ext = <></>,
    ...others
  } = props;

  return (
    <li
      className={`px-6 py-2 text-gray-800 hover:bg-gray-200/70 ${
        isRelative ? "relative" : ""
      } ${isGroup ? "group" : ""}`}
    >
      <_Item href={href} {...others}>
        <span className="w-6 h-6">{icon}</span>
        <span
          className={`text-lg font-normal ${
            isWidest ? "tracking-widest" : ""
          } xl:tracking-widest`}
        >
          {children}
        </span>
      </_Item>
      {ext}
    </li>
  );
}
function _Item(props) {
  const {
    isButton = false,
    className = "",
    children,
    href = "",
    onClick = () => {},
    ...others
  } = props;
  const { toggle } = useMainMenuContext();
  const css = `flex justify-start items-center space-x-3 ${className}`;
  if (isButton) {
    return (
      <button type="button" onClick={onClick} className={css} {...others}>
        {children}
      </button>
    );
  }
  return (
    <Link href={href} className={css} onClick={() => toggle()} {...others}>
      {children}
    </Link>
  );
}
