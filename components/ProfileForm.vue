.
<template>
  <div>
    <div class="pet">
      <img class="v-imgf" :src="profileHeader" />
      <span class="SpetInfo">Pet Information</span>
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
            ></v-text-field>
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
        <img class="v-imgf" :src="profileHeader2" />
        <span class="SpetInfo">Owner Information</span>
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
          @click="formSubmit"
        >
          Submit
        </v-btn>
      </v-col>
    </v-form>
  </div>
</template>

<script setup lang="ts">
import profileHeader from "@/assets/images/head1.png";
import profileHeader2 from "@/assets/images/head2.png";

import { useProfileForm } from "@/stores/profileForm";
import { storeToRefs } from "pinia";
const store = useProfileForm();
const { pet, category, owner } = storeToRefs(store);
const { initialize } = store;

initialize();

const form = ref(false);
const loading = ref(false);
const myForm = ref();

// Pet ----------------------------------------------------------------------
// const petName = ref("");
// const breed = ref("");
// const birth = ref("");
// const petAge = ref("");
// const gender = ref("");
const genderItems = ["Female", "Male"];
// const category = ref("");
const categoryItems = ["Avian", "Canine", "Feline", "Herd", "Piscine"];
const petRule = fieldRule();

// Owner ----------------------------------------------------------------------
// const firstName = ref("");
// const lastName = ref("");
// const ownerAge = ref("");
// const contact = ref("");
// const address = ref("");

const formSubmit = async () => {
  loading.value = true;
  form.value = true;
  console.log(pet.value, category.value, owner.value);

  const { valid } = await myForm.value.validate();
  if (valid) {
    alert("Form is submitted");
    myForm.value.reset();
    loading.value = false;
  }
};
</script>
