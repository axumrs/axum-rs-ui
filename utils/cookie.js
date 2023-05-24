import { getCookie } from "cookies-next";

export const NAME = process.env.NEXT_PUBLIC_TOKEN_COOKIE_NAME;

export const getToken = () => {
  return getCookie(NAME);
};

export const getTokenSSR = ({ req, res }) => {
  return getCookie(NAME, { req, res });
};
