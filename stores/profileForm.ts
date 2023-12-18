import { defineStore } from "pinia";
//import { Category, Pet, Owner } from "@prisma/client";

export const useProfileForm = defineStore("profileForm", () => {
  const initialized = ref(false);
  async function initialize() {
    if (initialized.value) return;
    initialized.value = true;
  }

  const category = ref({
    type: "",
    slug: "",
  });
  //console.log(category.value);

  const pet = ref({
    petName: "",
    slug: "",
    petAge: "",
    breed: "",
    birth: "",
    gender: "",
  });
  //console.log(pet.value.petName);

  const owner = ref({
    firstName: "",
    lastName: "",
    ownerAge: "",
    contact: "",
    address: "",
  });
  //console.log(owner.value);

  // const categoryData = (type, slug) => {
  //   category.type = type;
  //   category.slug = slug;
  // };

  // const petData = (name, breed, birth, age, gender) => {
  //   pet.petName = name;
  //   pet.breed = breed;
  //   pet.birth = birth;
  //   pet.petAge = age;
  //   pet.gender = gender;
  // };

  // const ownerData = (firstName, lastName, age, contact, address) => {
  //   owner.firstName = firstName;
  //   owner.lastName = lastName;
  //   owner.ownerAge = age;
  //   owner.contact = contact;
  //   owner.address = address;
  // };

  return {
    initialize,
    category,
    pet,
    owner,
    // categoryData,
    // petData,
    // ownerData,
  };
});
