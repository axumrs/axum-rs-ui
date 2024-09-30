import type { UseFetchOptions } from "nuxt/app";

type _FetchOptions<T> = UseFetchOptions<ApiResp<T>> & {
  noLoading?: boolean;
  callback?: (data: T | null) => T | null;
};

class AppFetchError extends Error {}

function headers() {
  const { token } = use$auth();
  const h: Record<string, string> = {
    "Content-Type": "application/json",
    "Cache-Control": "no-cache",
    Accept: "application/json",
    "X-AXUM-CSRF": useRuntimeConfig().public.axum_csrf,
  };
  if (token && token.value) {
    h["Authorization"] = `Bearer ${token.value}`;
  }

  return h;
}
export default function use$fetch() {
  const { isLoading, toast } = use$status();
  const _fetch = <T>(url: string, opts?: _FetchOptions<T>) => {
    isLoading.value = opts?.noLoading !== true;

    const newOpts: UseFetchOptions<ApiResp<T>> = {
      ...opts,
      cache: "no-cache",
      headers: {
        ...headers(),
      },
    };
    return useFetch(url, newOpts)
      .then(({ data }) => {
        if (!data.value) {
          throw new AppFetchError("请检查网络");
        }
        if (data.value && data.value.code !== 0) {
          throw new AppFetchError(data.value.msg);
        }

        if (opts?.callback) {
          return opts?.callback(data.value.data);
        }
        return data.value.data;
      })
      .catch((e) => {
        console.log(e);
        if (e instanceof AppFetchError) {
          toast.value = e.message;
          return;
        }
        toast.value = "请检查网络";
      })
      .finally(() => {
        isLoading.value = false;
      });
  };

  const $get = <T>(
    url: string,
    callback?: (data: T | null) => T | null,
    opts?: _FetchOptions<T>
  ) => _fetch<T>(url, { ...opts, method: "GET", callback });

  const $del = <T>(
    url: string,
    callback?: (data: T | null) => T | null,
    opts?: _FetchOptions<T>
  ) => _fetch<T>(url, { ...opts, method: "DELETE", callback });

  const $post = <T>(
    url: string,
    body?: string | Record<string, any>,
    callback?: (data: T | null) => T | null,
    opts?: _FetchOptions<T>
  ) => _fetch<T>(url, { ...opts, method: "POST", callback, body });

  const $patch = <T>(
    url: string,
    body?: string | Record<string, any>,
    callback?: (data: T | null) => T | null,
    opts?: _FetchOptions<T>
  ) => _fetch<T>(url, { ...opts, method: "PATCH", callback, body });

  const $put = <T>(
    url: string,
    body?: string | Record<string, any>,
    callback?: (data: T | null) => T | null,
    opts?: _FetchOptions<T>
  ) => _fetch<T>(url, { ...opts, method: "PUT", callback, body });

  const $err = (msg: string) => new AppFetchError(msg);

  return { $get, $post, $del, $patch, $put, $err };
}
