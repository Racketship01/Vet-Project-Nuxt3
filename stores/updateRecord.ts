import { defineStore } from "pinia";
import type { Pet, Owner } from "@/types/profile";
import type { QueryCategoryPet } from "~/types/queries";

export const useUpdateRecord = defineStore("updateRecord", () => {
  const { slugCategory, slugPet } = useRoute().params as QueryCategoryPet;

  const pet = reactive<Pet>({
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
            ...owner,
          },
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  return {
    pet,
    owner,
    updateRecordInfo,
  };
});
