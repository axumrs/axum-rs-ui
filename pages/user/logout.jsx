import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { geta } from "../../fetcher/fetcher";
import { deleteCookie } from "cookies-next";

export default function UserLogout() {
  const router = useRouter();

  useEffect(() => {
    geta("/user/logout")
      .then((data) => {
        console.log(data);
        deleteCookie(process.env.NEXT_PUBLIC_TOKEN_COOKIE_NAME);
        router.push("/");
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return <></>;
}
