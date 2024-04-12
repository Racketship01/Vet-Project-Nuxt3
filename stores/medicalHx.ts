import { defineStore } from "pinia";
import type { AnnualVax } from "@/types/profile";
import type { QueryCategoryPet } from "~/types/queries";

export const useMedical = defineStore("medicalHx", () => {
  const { slugCategory, slugPet } = useRoute().params as QueryCategoryPet;

  const medicalHx = reactive<AnnualVax>({
    id: undefined,
    age: undefined,
    date: "",
    weight: undefined,
    description: "",
    followUp: "",
    veterinarian: "",
  });

  const insertMedical = async () => {
    try {
      await $fetch(
        `/api/profile/category/${slugCategory}/pet/${slugPet}/medicalHx`,
        {
          method: "POST",
          body: {
            ...medicalHx,
          },
        }
      );
    } catch (e) {
      console.log(e);
    }
  };

  const updateMedical = async () => {
    try {
      await $fetch(
        `/api/profile/category/${slugCategory}/pet/${slugPet}/medicalHx`,
        {
          method: "PUT",
          body: {
            ...medicalHx,
          },
        }
      );
    } catch (e) {
      console.log(e);
    }
  };

  return {
    medicalHx,
    insertMedical,
    updateMedical,
  };
});
