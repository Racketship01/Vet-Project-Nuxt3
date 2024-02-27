import { defineStore } from "pinia";
import { Category, Pet, Owner } from "@/types/profile";

export const useProfileForm = defineStore("profileForm", () => {
  // const initialized = ref(false);
  // async function initialize() {
  //   if (initialized.value) return;
  //   initialized.value = true;
  // }

  const category = ref<Category>({
    type: "",
    slugCategory: "",
  });

  const pet = ref<Pet>({
    petName: "",
    slugPet: "",
    petID: "",
    petAge: "",
    breed: "",
    birth: "",
    gender: "",
  });

  const owner = ref<Owner>({
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
          petName: pet.value.petName,
          slugPet: pet.value.slugPet,
          petID: pet.value.petID,
          petAge: pet.value.petAge,
          breed: pet.value.breed,
          birth: pet.value.birth,
          gender: pet.value.gender,
          type: category.value.type,
          slugCategory: category.value.slugCategory,
          firstName: owner.value.firstName,
          lastName: owner.value.lastName,
          ownerAge: owner.value.ownerAge,
          contact: owner.value.contact,
          address: owner.value.address,
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
