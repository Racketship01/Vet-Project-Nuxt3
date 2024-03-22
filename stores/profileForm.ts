import { defineStore } from "pinia";
import type { Category, Pet, Owner } from "@/types/profile";
//import type { QueryCategoryPet } from "~/types/queries";

export const useProfileForm = defineStore("profileForm", () => {
  // const initialized = ref(false);
  // async function initialize() {
  //   if (initialized.value) return;
  //   initialized.value = true;
  // }

  //const { slugCategory, slugPet } = useRoute().params as QueryCategoryPet;

  const category = reactive<Category>({
    type: "",
    slugCategory: "",
    petID: "",
  });

  const pet = reactive<Pet>({
    petName: "",
    slugPet: "",
    petAge: "",
    breed: "",
    birth: "",
    gender: "",
  });

  const owner = reactive<Owner>({
    firstName: "",
    lastName: "",
    ownerAge: "",
    contact: "",
    address: "",
  });

  const postForm = async () => {
    try {
      await $fetch("/api/profile/profileForm/form", {
        method: "POST",
        body: {
          ...pet,
          ...category,
          ...owner,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return {
    //initialize,
    category,
    pet,
    owner,
    postForm,
  };
});
