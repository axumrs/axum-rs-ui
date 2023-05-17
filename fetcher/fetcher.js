import axios from "axios";

const fetcher = axios.create({
  //   baseURL: `${process.env.NEXT_PUBLIC_API_URL}/web`,
  //   timeout: process.env.NEXT_PUBLIC_FETCHER_TIMEOUT,
});

fetcher.defaults.headers.common["Content-Type"] =
  "application/json;charset=utf-8";
fetcher.defaults.headers.common["X-Product"] = "axum.rs";

export const get =
  (params = {}) =>
  (url) =>
    fetcher.get(url, { params }).then(({ data }) => data);

export const post =
  (data = {}) =>
  (url) =>
    fetcher.post(url, data).then(({ data }) => data);
