import React, { useEffect } from "react";
import Layout from "./Layout";
import { useAuthContext } from "../../contexts/AuthContext";
import { useRouter } from "next/router";

export default function UserCenterLayout(page, enableBgVideo = false) {
  console.log("UserCenterLayout");
  return (
    <>
      <NeedLogin />
      <Layout enableBgVideo={enableBgVideo}>{page}</Layout>
    </>
  );
}

function NeedLogin() {
  const { getAuth } = useAuthContext();
  // console.log("NeedLogin:", getAuth);

  const router = useRouter();

  useEffect(() => {
    if (!getAuth()) {
      router.push(`/login?r=${router.asPath}`);
    }
  }, []);

  return <></>;
}
