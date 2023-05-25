// import axios from "axios";

import { getCookie } from "cookies-next";

// const fetcher = axios.create({
//   baseURL: `${process.env.NEXT_PUBLIC_API_URL}/web`,
//   timeout: process.env.NEXT_PUBLIC_FETCHER_TIMEOUT,
// });

// fetcher.defaults.headers.common["Content-Type"] =
//   "application/json;charset=utf-8";
// fetcher.defaults.headers.common["X-Product"] = "axum.rs";

// export const get =
//   (params = {}) =>
//   (url) =>
//     fetcher.get(url, { params }).then(({ data }) => data);

// export const post =
//   (data = {}) =>
//   (url) =>
//     fetcher.post(url, data).then(({ data }) => data);
// export default fetcher;

function getUserAgent() {
  if (typeof window === "undefined") {
    return "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:109.0) Gecko/20100101 Firefox/113.0";
  }
  return window?.navigator?.userAgent;
}

const fetchOption = {
  headers: {
    "Content-Type": "application/json",
    "User-Agent": getUserAgent(),
  },
};

function authFetchOption(token) {
  const clientToken = getCookie(process.env.NEXT_PUBLIC_TOKEN_COOKIE_NAME);
  const opt = {
    headers: {
      ...fetchOption.headers,
      Authorization: `Bearer ${token || clientToken}`,
    },
  };
  return opt;
}

const apiUrl = (url) => `${process.env.NEXT_PUBLIC_API_URL}/web${url}`;

export const get = (url) =>
  fetch(apiUrl(url), fetchOption).then((res) => res.json());

export const post = (url, data, option = {}) =>
  fetch(apiUrl(url), {
    ...fetchOption,
    ...option,
    method: "POST",
    body: JSON.stringify(data),
  }).then((res) => res.json());

export const geta = (url, token) =>
  fetch(apiUrl(url), authFetchOption(token)).then((res) => res.json());

export const posta = (url, data, token) =>
  fetch(apiUrl(url), {
    ...authFetchOption(token),
    method: "POST",
    body: JSON.stringify(data),
  }).then((res) => res.json());
