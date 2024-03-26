import type { PrimaryVax } from "~~/types/pet";

export default async (slugCategory: string, slugPet: string) => {
  const { data, error } = await useFetch<PrimaryVax>(
    `/api/profile/category/${slugCategory}/pet/${slugPet}/getPrimaryVax`
  );

  if (error.value) {
    throw createError({
      ...error.value,
      statusMessage: `Primary vaccine info not found`,
    });
  }

  return data;
};

// useFetchWithCache<Owner>(
//   `/api/profile/category/${slugCategory}/pet/${slugPet}/owner`
// );
