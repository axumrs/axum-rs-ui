import React from "react";
import MoreButton from "./Button/MoreButton";

function Card({ children, className = "", ...other }) {
  return (
    <div className={`border rounded-md bg-white p-3 ${className}`} {...other}>
      {children}
    </div>
  );
}

function CardHeader({
  title,
  moreText,
  href = "",
  className = "",
  hasMore = true,
  isBtn = false,
  onClick = () => {},
}) {
  return (
    <div
      className={`flex justify-start items-center space-x-2 mb-3 ${className}`}
    >
      <h2 className="text-xl font-semibold">{title}</h2>
      {hasMore && (
        <MoreButton href={href} isBtn={isBtn} onClick={onClick}>
          {moreText}
        </MoreButton>
      )}
    </div>
  );
}

Card.Header = CardHeader;

export default Card;
