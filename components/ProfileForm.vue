<template>
  <div>
    <div class="pet">
      <img class="formimg" :src="PetImg" />
    </div>

    <v-form v-model="form" class="form" ref="myForm">
      <v-container>
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="pet.petName"
              :rules="petRule"
              label="Pet name"
              persistent-hint
              :readonly="loading"
              required
            >
            </v-text-field>
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field
              v-model="pet.breed"
              :rules="petRule"
              label="Breed"
              persistent-hint
              :readonly="loading"
              required
            >
            </v-text-field>
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field
              type="date"
              v-model="pet.birth"
              :rules="petRule"
              label="Date of Birth"
              persistent-hint
              :readonly="loading"
            >
            </v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model.number="pet.petAge"
              :rules="petRule"
              label="Age"
              persistent-hint
              :readonly="loading"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-select
              v-model="pet.gender"
              :items="genderItems"
              :rules="[(v) => !!v || 'Item is required']"
              label="Gender"
              required
            ></v-select>
          </v-col>

          <v-col cols="12" md="6">
            <v-select
              v-model="category.type"
              :items="categoryItems"
              :rules="[(v) => !!v || 'Item is required']"
              label="Category"
              required
            ></v-select>
          </v-col>
        </v-row>
      </v-container>

      <!-- Owner----------------------------------------------------- -->
      <div class="pet">
        <img class="formimg" :src="OwnerImg" />
      </div>

      <v-container>
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="owner.firstName"
              :rules="petRule"
              label="First name"
              persistent-hint
              :readonly="loading"
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field
              v-model="owner.lastName"
              :rules="petRule"
              label="Last name"
              persistent-hint
              :readonly="loading"
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field
              v-model.number="owner.ownerAge"
              :rules="petRule"
              label="Age"
              persistent-hint
              :readonly="loading"
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field
              v-model.number="owner.contact"
              :rules="petRule"
              label="Contact number"
              persistent-hint
              :readonly="loading"
            ></v-text-field>
          </v-col>

          <v-col>
            <v-text-field
              v-model="owner.address"
              :rules="petRule"
              label="Address"
              persistent-hint
              :readonly="loading"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-container>

      <!-- button -->

      <v-col cols="12" class="btnform">
        <v-btn
          type="submit"
          :disabled="!form"
          :loading="loading"
          block
          size="x-large"
          color="blue-darken-1"
          variant="flat"
          @click.prevent="formSubmit"
        >
          Submit
        </v-btn>
      </v-col>
    </v-form>
  </div>
</template>

<script setup lang="ts">
import PetImg from "@/assets/images/petImg.png";
import OwnerImg from "@/assets/images/ownImg.png";

import profileHeader2 from "@/assets/images/head2.png";
import { useProfileForm } from "@/stores/profileForm";
import { storeToRefs } from "pinia";
const store = useProfileForm();
const { pet, category, owner } = storeToRefs(store);
const { postForm } = store;

const form = ref(false);
const loading = ref(false);
const myForm = ref();

const genderItems = ["Female", "Male"];
const categoryItems = ["Avian", "Canine", "Feline", "Herd", "Piscine"];
const petRule = fieldRule();

// Slug ------------------------------------------
const randomNum = Math.trunc(Math.random() * 1000000) + 1;

const formSubmit = async () => {
  loading.value = true;
  form.value = true;

  const petSlug =
    pet.value.petName.split("").slice(0, 3).join("").toUpperCase() + randomNum;

  const categorySlug = category.value.type
    .split("")
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const petID = categorySlug + "-" + petSlug;

  pet.value.slugPet = petSlug;
  category.value.slugCategory = categorySlug;
  pet.value.petID = petID;
  //pet.value.birth = Number(pet);
  console.log(typeof pet.value.birth);
  postForm();

  const { valid } = await myForm.value.validate();
  if (valid) {
    alert("Form is submitted");
    myForm.value.reset();
    loading.value = false;
    pet.value.slugPet = "";
    category.value.slugCategory = "";
    pet.value.petID = "";
  }
};

watch(pet.value, () => {
  console.log("PET", pet.value);
});
watch(category.value, () => {
  console.log("CATEGORY", category.value);
});
watch(owner.value, () => {
  console.log("OWNER", owner.value);
});
</script>
