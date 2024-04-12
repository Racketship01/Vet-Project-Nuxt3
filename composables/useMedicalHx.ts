import type { MedicalHx } from "~~/types/pet";

export default async (slugCategory: string, slugPet: string) => {
  const { data, error } = await useFetch<MedicalHx>(
    `/api/profile/category/${slugCategory}/pet/${slugPet}/getMedicalHx`
  );

  if (error.value) {
    throw createError({
      ...error.value,
      statusMessage: `Annual vaccine info not found`,
    });
  }

  return data;
};

// useFetchWithCache<Owner>(
//   `/api/profile/category/${slugCategory}/pet/${slugPet}/owner`
// );
