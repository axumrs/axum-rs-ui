"use client";

import { CookiesProvider } from "next-client-cookies";

export const AxumrsCookieProvider: typeof CookiesProvider = (props) => (
  <CookiesProvider {...props} />
);
