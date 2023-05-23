import React, { useEffect, useState } from "react";
import { geta } from "../../fetcher/fetcher";
import { getCookie } from "cookies-next";

export default function UserSubscribe() {
  const [r, setR] = useState();
  useEffect(() => {
    const token = getCookie(process.env.NEXT_PUBLIC_TOKEN_COOKIE_NAME);
    geta(`/user/subscribe`, token).then((d) => {
      console.log(d);
    });
  }, []);
  return <div>UserSubscribe</div>;
}

// UserSubscribe.getLayout = UserCenterLayout;

export async function getServerSideProps({ req, res }) {
  const token = getCookie(process.env.NEXT_PUBLIC_TOKEN_COOKIE_NAME, {
    req,
    res,
  });
  const { data } = await geta(`/user`, token);

  return { props: { data } };
}
