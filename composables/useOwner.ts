import type { Owner } from "~~/types/pet";

export default async (slugCategory: string, slugPet: string) => {
  const { data, error } = await useFetch<Owner>(
    `/api/profile/category/${slugCategory}/pet/${slugPet}/owner`
  );

  if (error.value) {
    throw createError({
      ...error.value,
      statusMessage: `Could not fetch lesson data`,
    });
  }

  return data;
};

// useFetchWithCache<Owner>(
//   `/api/profile/category/${slugCategory}/pet/${slugPet}/owner`
// );
