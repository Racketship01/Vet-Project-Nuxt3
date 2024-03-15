/* eslint-disable quotes */
/* eslint-disable quotes */
import type { ClinicType } from "~~/server/api/profile/meta.get";

export default async () => {
  // useFetchWithCache<ClinicType>("/api/profile/meta");

  const route = useRoute();
  //const routeParamsPage = computed(() => route.query.page);
  const { data, error } = await useFetch<ClinicType>("/api/profile/meta", {
    headers: useRequestHeaders(["cookie"]),
    key: "/api/profile/meta/" + route.query.page,
    params: {
      page: route.query.page,
    },
  });

  if (error.value) {
    throw createError({
      ...error.value,
      statusMessage: `Could not fetch lesson data`,
    });
  }

  return data;
};
