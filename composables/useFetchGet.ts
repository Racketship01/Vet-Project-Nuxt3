export const useFetchGet = (url: string, param?: object, key?: string) =>
  useFetch(url, {
    watch: false,
    method: "GET",
    body: param,
    immediate: false,
    headers: useRequestHeaders(["cookie"]),
    key,
  });
