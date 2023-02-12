import React from "react";
import Row from "./Row";

export default function Text(props) {
  const {
    className = "",
    rowClassName = "",
    labelClassName = "",
    ...others
  } = props;
  const css = `form-input ${className}`;
  return (
    <Row {...others} className={rowClassName}>
      <input {...others} className={css} />
    </Row>
  );
}
