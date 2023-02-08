import React from "react";

export default function Text(props) {
  const { label, type = "text", id, ...others } = props;
  if (id) {
    return (
      <div>
        <label htmlFor={id}>{label}</label>
        <input {...others} type={type} id={id} />
      </div>
    );
  }
  return (
    <div>
      <label>
        {label}
        <input {...others} type={type} />
      </label>
    </div>
  );
}
