/* eslint-disable quotes */
// eslint-disable-next-line import/no-extraneous-dependencies
import { StorageSerializers, useSessionStorage } from "@vueuse/core";

export default async <T>(url: string) => {
  // Use sessionStorage to cache the lesson data
  const cached = useSessionStorage<T>(url, null, {
    serializer: StorageSerializers.object,
  });

  if (!cached.value) {
    const { data, error } = await useFetch<T>(url, {
      headers: useRequestHeaders(["cookie"]),
    });

    if (error.value) {
      throw createError({
        ...error.value,
        statusMessage: `Could not fetch data from ${url}`,
      });
    }

    cached.value = data.value as T;
  } else {
    console.log(`Getting value from cache for ${url}`);
  }

  return cached;
};
