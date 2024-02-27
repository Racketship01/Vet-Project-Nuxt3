<template>
  <div>
    <img cover class="picover" :src="cover" />
  </div>

  <div class="dpwrapper">
    <img cover class="petdp" :src="dp" />
    <div class="overlay">
      <v-btn
        :rules="rules"
        accept="image/png, image/jpeg, image/bmp"
        class="btnupload"
        icon="mdi-camera"
      >
      </v-btn>
    </div>
  </div>

  <div class="headtitle">
    <div class="head1">
      <h1>{{ pet.petName }}</h1>
    </div>

    <!-- <div class="ptcheck">
      <v-checkbox class="vcheck1" label="Medical"></v-checkbox>
      <v-checkbox class="vcheck2" label="Vaccination"></v-checkbox>
    </div> -->
  </div>

  <div class="head2">
    <h3 class="vBar">Pet Information</h3>
    <div class="head3">
      <h3 class="vBar">Owner Information</h3>

      <v-dialog v-model="dialog" persistent width="550">
        <template v-slot:activator="{ props }">
          <v-btn
            color="blue-darken-1"
            density="comfortable"
            prepend-icon="$edit"
            variant="outlined"
            v-bind="props"
          >
            Edit
          </v-btn>
        </template>
        <v-card>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="10">
                  <v-card-title>
                    <span class="vBar">Pet information</span>
                  </v-card-title>
                </v-col>

                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="petname"
                    :rules="nameRules"
                    :counter="10"
                    label="Pet name"
                    required
                    hide-details
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="breed"
                    :rules="nameRules"
                    :counter="10"
                    label="Breed"
                    hide-details
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="DOB"
                    :rules="nameRules"
                    :counter="10"
                    label="Date of Birth"
                    hide-details
                    required
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="age"
                    :rules="nameRules"
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

                <v-col cols="12">
                  <v-card-title>
                    <span class="vBar">Owner Information</span>
                  </v-card-title>
                </v-col>

                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="Ownername"
                    :rules="nameRules"
                    :counter="10"
                    label="Name"
                    required
                    hide-details
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="Lastname"
                    :rules="nameRules"
                    :counter="10"
                    label="Last name"
                    hide-details
                    required
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="Age"
                    :rules="nameRules"
                    :counter="10"
                    label="Age"
                    hide-details
                    required
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="number"
                    :rules="nameRules"
                    :counter="10"
                    label="Contact number"
                    hide-details
                    required
                  ></v-text-field>
                </v-col>

                <v-col>
                  <v-text-field
                    v-model="address"
                    :rules="nameRules"
                    label="Address"
                    hide-details
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue-darken-1" variant="text" @click="dialog = false">
              Close
            </v-btn>
            <v-btn color="blue-darken-1" variant="text" @click="dialog = false">
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>

    <div class="pgap">
      <p>Breed:</p>
      <span>Corgi</span>
      <p>Date of Birth:</p>
      <span>10/10/23</span>
      <p>Age:</p>
      <span>2 Months</span>
      <p>Gender:</p>
      <span>Male</span>
      <p>Category:</p>
      <span>Canine</span>
    </div>
    <div class="pgap">
      <p>Owner name:</p>
      <span>Welson</span>
      <p>Last name:</p>
      <span>Lee</span>
      <p>Age:</p>
      <span>28 years old</span>
      <p>Contact no:</p>
      <span>09990451635</span>
      <p>Adress:</p>
      <span class="d-inline-block text-truncate" style="max-width: 100px">
        Unit 320 Cedar crest Acacia Estate brgy. Bambang, Taguig City.
      </span>
    </div>
  </div>

  <div class="head4">
    <div class="head5">
      <h3 class="vBar">Basic Vaccination</h3>
      <v-progress-circular
        :rotate="360"
        :size="30"
        :width="3"
        :model-value="value"
        color="teal"
      >
        <template v-slot:default> {{ value }} % </template>
      </v-progress-circular>
    </div>

    <div>
      <v-dialog v-model="dialogMed" persistent width="550">
        <template v-slot:activator="{ props }">
          <v-btn
            color="blue-darken-1"
            density="comfortable"
            prepend-icon="$edit"
            variant="outlined"
            v-bind="props"
          >
            Medical Update
          </v-btn>
        </template>

        <v-card>
          <v-container>
            <div
              class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between"
            >
              Password
            </div>
            <v-text-field
              :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
              :type="visible ? 'text' : 'password'"
              density="compact"
              placeholder="Enter your password"
              prepend-inner-icon="mdi-lock-outline"
              color="blue-darken-1"
              variant="outlined"
              @click:append-inner="visible = !visible"
            ></v-text-field>
          </v-container>
          <v-card-actions class="actionbtn">
            <v-spacer></v-spacer>
            <v-btn
              class="actionbtn"
              color="blue-darken-1"
              variant="text"
              @click="dialogMed = false"
            >
              Cancel
            </v-btn>
            <v-btn
              class="actionbtn"
              color="blue-darken-1"
              variant="text"
              @click="dialogMed = false"
            >
              Confirm
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </div>

  <div class="tblebck">
    <v-toolbar>
      <v-toolbar-title>Medical History</v-toolbar-title>
    </v-toolbar>

    <v-col cols="auto" class="overflow-auto">
      <v-card width="1050" height="220" class="overflow-auto">
        <div class="tbdvder">
          <div>
            <PrimaryVaxTable />
          </div>
          <div>
            <AnnualVaxTable />
          </div>
          <div>
            <MedicalHxTable />
          </div>
        </div>
      </v-card>
    </v-col>
  </div>

  <div class="btn">
    <v-btn color="blue-darken-1" variant="flat" size="large"> Update </v-btn>

    <v-btn color="blue-darken-1" variant="flat" size="large"> Delete </v-btn>
  </div>
</template>

<script lang="ts" setup>
import cover from "@/assets/images/coverprof.jpg";
import dp from "@/assets/images/corgi.jpeg";
import type { QueryCategoryPet } from "~/types/queries";

definePageMeta({
  middleware: ["abort", "auth"],
});

const route = useRoute();
const { slugCategory, slugPet } = route.params as QueryCategoryPet;
const meta = useMeta();
const categories = meta.value.categories;
const pet = usePet(slugCategory, slugPet);
const owner = useOwner(slugCategory, slugPet);

const categoryMeta = computed(() =>
  categories.find(
    (category: any) => category.slugCategory === route.params.slugCategory
  )
);

// profile state
const visible = ref(false);
const dialog = ref(false);
const dialogMed = ref(false);

const gender = ref("");
const genderItems = ["Female", "Male"];

const category = ref("");
const categoryItems = ["Mammal", "Reptile", "Amphibian", "Bird", "Fish"];

const rules = [
  (value: any) => {
    return (
      !value ||
      !value.length ||
      value[0].size < 2000000 ||
      "Avatar size should be less than 2 MB!"
    );
  },
];
</script>
