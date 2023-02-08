import React, { useState } from "react";
import Form, { Text } from "../components/Form";
import PageMeta from "../components/PageMeta";
export default function Register() {
  const [foo, setFoo] = useState("");
  const submiter = (e) => {
    window.alert("submit: " + foo);
  };
  const fooHandler = (e) => {
    setFoo(e.target.value);
  };
  return (
    <>
      <PageMeta>用户注册</PageMeta>
      <Form submiter={submiter} className="bg-red-100">
        <Text
          label="foo"
          onChange={fooHandler}
          value={foo}
          placeholder="输入内容"
          id="foo"
        />
        <button type="submit">提交</button>
      </Form>
    </>
  );
}
