<template>
  <div>
    <div class="pet">
      <img class="v-imgf" :src="profileHeader" />
      <span class="SpetInfo">Pet Information</span>
    </div>

    <v-form
      class="form"
      v-model="form"
      ref="resetForm"
      @submit.prevent="petFormSubmit"
    >
      <v-container>
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="petname"
              :rules="petRule"
              :counter="10"
              label="Pet name"
              required
              hide-details
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field
              v-model="breed"
              :rules="petRule"
              :counter="10"
              label="Breed"
              hide-details
              required
            >
            </v-text-field>
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field
              type="date"
              v-model="birth"
              :rules="petRule"
              :counter="10"
              label="Date of Birth"
              hide-details
              required
            >
            </v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="petAge"
              :rules="petRule"
              :counter="10"
              label="Age"
              hide-details
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-select
              v-model="gender"
              :items="genderItems"
              :rules="[(v) => !!v || 'Item is required']"
              label="Gender"
              required
            ></v-select>
          </v-col>

          <v-col cols="12" md="6">
            <v-select
              v-model="category"
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
              v-model="firstName"
              :rules="petRule"
              :counter="10"
              label="First name"
              required
              hide-details
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field
              v-model="lastName"
              :rules="petRule"
              :counter="10"
              label="Last name"
              hide-details
              required
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field
              v-model="ownerAge"
              :rules="petRule"
              :counter="10"
              label="Age"
              hide-details
              required
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field
              v-model="contact"
              :rules="petRule"
              :counter="10"
              label="Contact number"
              hide-details
              required
            ></v-text-field>
          </v-col>

          <v-col>
            <v-text-field
              v-model="address"
              :rules="petRule"
              :counter="10"
              label="Address"
              hide-details
              required
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

const form = ref(false);
const loading = ref(false);

// Pet ----------------------------------------------------------------------
const petname = ref("");
const breed = ref("");
const birth = ref("");
const petAge = ref("");
const gender = ref("");
const genderItems = ["Female", "Male"];
const category = ref("");
const categoryItems = ["Avian", "Canine", "Feline", "Herd", "Piscine"];
const petRule = fieldRule();

// Owner ----------------------------------------------------------------------
const firstName = ref("");
const lastName = ref("");
const ownerAge = ref("");
const contact = ref("");
const address = ref("");

const petFormSubmit = () => {};
</script>
