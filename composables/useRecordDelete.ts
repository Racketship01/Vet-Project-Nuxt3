import type { PetWithPath } from "~~/types/pet";

export default async (slugCategory: string, slugPet: string) => {
  const { data, error } = await useFetch<PetWithPath>(
    `/api/profile/category/${slugCategory}/pet/${slugPet}/deleteRecord`
  );

  if (error.value) {
    throw createError({
      ...error.value,
      statusMessage: `Could not delete Record`,
    });
  }

  return data;
};
