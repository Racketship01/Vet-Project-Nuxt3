/* eslint-disable quotes */
/* eslint-disable quotes */
import type { ClinicType } from "~~/server/api/profile/meta.get";

export default async () => useFetchWithCache<ClinicType>("/api/profile/meta");
