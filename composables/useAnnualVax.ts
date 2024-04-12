import type { AnnualVax } from "~~/types/pet";

export default async (slugCategory: string, slugPet: string) => {
  const { data, error } = await useFetch<AnnualVax>(
    `/api/profile/category/${slugCategory}/pet/${slugPet}/getAnnualVax`
  );

  if (error.value) {
    throw createError({
      ...error.value,
      statusMessage: `Annual vaccine info not found`,
    });
  }

  return data;
};
