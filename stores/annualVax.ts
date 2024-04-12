import { defineStore } from "pinia";
import type { AnnualVax } from "@/types/profile";
import type { QueryCategoryPet } from "~/types/queries";

export const useAnnual = defineStore("annualVax", () => {
  const { slugCategory, slugPet } = useRoute().params as QueryCategoryPet;

  const annualVax = reactive<AnnualVax>({
    id: undefined,
    age: undefined,
    date: "",
    weight: undefined,
    description: "",
    followUp: "",
    veterinarian: "",
  });

  const insertAnnual = async () => {
    try {
      await $fetch(
        `/api/profile/category/${slugCategory}/pet/${slugPet}/annualVax`,
        {
          method: "POST",
          body: {
            ...annualVax,
          },
        }
      );
    } catch (e) {
      console.log(e);
    }
  };

  const updateAnnual = async () => {
    try {
      await $fetch(
        `/api/profile/category/${slugCategory}/pet/${slugPet}/annualVax`,
        {
          method: "PUT",
          body: {
            ...annualVax,
          },
        }
      );
    } catch (e) {
      console.log(e);
    }
  };

  return {
    annualVax,
    insertAnnual,
    updateAnnual,
  };
});
