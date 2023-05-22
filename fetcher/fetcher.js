// import axios from "axios";

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

const fetchOption = {
  headers: {
    "Content-Type": "application/json",
  },
};

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
