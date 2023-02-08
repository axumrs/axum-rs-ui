import React from "react";

export function Button(props) {
  return <_Button {...props} />;
}

export function LinkButton(props) {
  return <_Button {...props} isLink={true} />;
}

function _Button(props) {
  const {
    type = "button",
    isLink = false,
    className = "",
    children = "",
    theme = "default",
    isGhost = false,
    size = "default",
    ...others
  } = props;
  const baseClassName = (() => {
    const colors = {
      default: {
        bg: isGhost ? "bg-white" : "bg-blue-500",
        text: isGhost ? "text-blue-500" : "text-white",
        border: "border-blue-600",
      },
    };
    const hoverColors = {
      default: {
        bg: "hover:bg-blue-600",
        text: "hover:text-white",
        border: "hover:border-blue-600",
      },
    };
    const sizes = {
      default: {
        px: "px-6",
        py: "py-2",
        font: "text-normal",
      },
      xs: {
        px: "px-3",
        py: "py-1",
        font: "text-xs",
      },
    };

    return `border  ${sizes[size].px} ${sizes[size].py} ${sizes[size].font} ${colors[theme].bg} ${colors[theme].text} ${colors[theme].border} ${hoverColors[theme].bg} ${hoverColors[theme].text} ${hoverColors[theme].border}`;
  })();
  const fullClassName = className
    ? `${baseClassName} ${className}`
    : baseClassName;

  if (isLink) {
    const { href = "/", ...linkOthers } = others;
    return (
      <a className={fullClassName} href={href} {...linkOthers}>
        {children}
      </a>
    );
  }
  return (
    <button type={type} className={fullClassName} {...others}>
      {children}
    </button>
  );
}
