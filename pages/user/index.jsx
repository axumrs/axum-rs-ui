import React from "react";
import PageMeta from "../../components/PageMeta";
// import { UserCenterLayout } from "../../components/Layout";
import { useAuthContext } from "../../contexts/AuthContext";
import { get, geta } from "../../fetcher/fetcher";
import { getCookie } from "cookies-next";

export default function UserHome({ data }) {
  const { getAuth } = useAuthContext();
  return (
    <>
      <PageMeta>用户遗忘</PageMeta>
      <div>{JSON.stringify(getAuth())}</div>
      <div>{JSON.stringify(data)}</div>
    </>
  );
}

// UserHome.getLayout = UserCenterLayout;

export async function getServerSideProps({ req, res }) {
  const cookie = getCookie("axumrs_user", { req, res });
  console.log("user scriber ssr got cookie:", cookie);
  const { data } = await geta(`/user`);

  return { props: { data } };
}
