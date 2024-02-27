/* eslint-disable quotes */
/* eslint-disable quotes */
import type { ClinicType } from "~~/server/api/profile/meta.get";

export default async () => {
  // useFetchWithCache<ClinicType>("/api/profile/meta");

  const { data, error } = await useLazyFetch<ClinicType>("/api/profile/meta");

  if (error.value) {
    throw createError({
      ...error.value,
      statusMessage: `Could not fetch lesson data`,
    });
  }

  return data;
};
