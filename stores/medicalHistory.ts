import { defineStore } from "pinia";
import type { PrimaryVax, AnnualVax, MedicalHx } from "@/types/profile";
import type { QueryCategoryPet } from "~/types/queries";

export const useMedicalHistory = defineStore("medicalHistory", () => {
  //   const initialized = ref(false);
  //   async function initialize() {
  //     if (initialized.value) return;
  //     initialized.value = true;
  //   }

  const { slugCategory, slugPet } = useRoute().params as QueryCategoryPet;

  const primaryVax = reactive<PrimaryVax>({
    age: undefined,
    date: "",
    weight: undefined,
    description: "",
    followUp: "",
    veterinarian: "",
    remarks: undefined,
  });

  // const primaryProgress = ref();

  const annualVax = reactive<AnnualVax>({
    age: "",
    date: "",
    weight: "",
    description: "",
    followUp: "",
    veterinarian: "",
  });

  const medicalHx = reactive<MedicalHx>({
    age: "",
    date: "",
    weight: "",
    description: "",
    followUp: "",
    veterinarian: "",
  });

  const upsertMedical = async () => {
    try {
      await $fetch(
        `/api/profile/category/${slugCategory}/pet/${slugPet}/medicalHistory`,
        {
          method: "POST",
          body: {
            ...primaryVax,
            // ...annualVax,
            // ...medicalHx,
          },
        }
      );
    } catch (e) {
      console.log(e);
    }
  };

  return {
    // initialize,
    primaryVax,
    annualVax,
    medicalHx,
    upsertMedical,
  };
});
