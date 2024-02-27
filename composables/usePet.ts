import type { PetWithPath } from "~~/types/pet";

export default async (slugCategory: string, slugPet: string) => {
  const { data, error } = await useFetch<PetWithPath>(
    `/api/profile/category/${slugCategory}/pet/${slugPet}`
  );

  if (error.value) {
    throw createError({
      ...error.value,
      statusMessage: `Could not fetch lesson data`,
    });
  }

  return data;
};
// useFetchWithCache<PetWithPath>(
//   `/api/profile/category/${slugCategory}/pet/${slugPet}`
// );
