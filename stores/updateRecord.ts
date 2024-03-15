import { defineStore } from "pinia";
import type { Category, Pet, Owner } from "@/types/profile";
import type { QueryCategoryPet } from "~/types/queries";

export const useUpdateRecord = defineStore("updateRecord", () => {
  //   const initialized = ref(false);
  //   async function initialize() {
  //     if (initialized.value) return;
  //     initialized.value = true;
  //   }

  const { slugCategory, slugPet } = useRoute().params as QueryCategoryPet;

  const category = reactive<Category>({
    type: "",
  });

  const pet = reactive<Pet>({
    petName: "",
    petAge: undefined,
    breed: "",
    birth: "",
    gender: "",
  });

  const owner = reactive<Owner>({
    firstName: "",
    lastName: "",
    ownerAge: undefined,
    contact: undefined,
    address: "",
  });

  const updateRecordInfo = async () => {
    try {
      await $fetch(
        `/api/profile/category/${slugCategory}/pet/${slugPet}/editRecordInfo`,
        {
          method: "PUT",
          body: {
            ...pet,
            ...category,
            ...owner,
          },
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  return {
    // initialize,
    category,
    pet,
    owner,
    updateRecordInfo,
  };
});
