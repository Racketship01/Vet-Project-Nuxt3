import { defineStore } from "pinia";
import type { PrimaryVax } from "@/types/profile";
import type { QueryCategoryPet } from "~/types/queries";

export const usePrimary = defineStore("primaryVax", () => {
  //   const initialized = ref(false);
  //   async function initialize() {
  //     if (initialized.value) return;
  //     initialized.value = true;
  //   }

  const { slugCategory, slugPet } = useRoute().params as QueryCategoryPet;

  const primaryVax = reactive<PrimaryVax>({
    id: undefined,
    age: undefined,
    date: "",
    weight: undefined,
    description: "",
    followUp: "",
    veterinarian: "",
    remarks: undefined,
  });

  const progress = reactive({
    id: undefined,
    remarks: undefined,
  });

  const insertPrimary = async () => {
    try {
      await $fetch(
        `/api/profile/category/${slugCategory}/pet/${slugPet}/primaryVax`,
        {
          method: "POST",
          body: {
            ...primaryVax,
          },
        }
      );
    } catch (e) {
      console.log(e);
    }
  };

  const updatePrimary = async () => {
    try {
      await $fetch(
        `/api/profile/category/${slugCategory}/pet/${slugPet}/primaryVax`,
        {
          method: "PUT",
          body: {
            ...primaryVax,
          },
        }
      );
    } catch (e) {
      console.log(e);
    }
  };

  const progressPrimary = async () => {
    try {
      await $fetch(
        `/api/profile/category/${slugCategory}/pet/${slugPet}/primaryProgress`,
        {
          method: "PUT",
          body: {
            ...progress,
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
    insertPrimary,
    updatePrimary,

    progress,
    progressPrimary,
  };
});
