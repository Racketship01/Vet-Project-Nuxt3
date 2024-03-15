<template>
  <div>
    <img cover class="picover" :src="cover" />
  </div>

  <div class="dpwrapper">
    <img cover class="petdp" :src="dp" />
    <div class="overlay">
      <v-btn
        :rules="rulesImage"
        accept="image/png, image/jpeg, image/bmp"
        class="btnupload"
        icon="mdi-camera"
      >
      </v-btn>
    </div>
  </div>

  <div class="headtitle">
    <div class="head1">
      <h1>{{ petAPI.petName }}</h1>
    </div>
  </div>

  <div class="head2">
    <h3 class="vBar">Pet Information</h3>
    <div class="head3">
      <h3 class="vBar">Owner Information</h3>

      <!-- --------UPDATE------------- -->
      <v-dialog v-model="state.dialogEdit" persistent width="550">
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
                    v-model="state.petName"
                    label="Petname"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="state.breed"
                    label="Breed"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    type="date"
                    v-model="state.birth"
                    label="Birthdate"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="state.petAge"
                    label="Age"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-select
                    v-model="state.gender"
                    :items="genderItems"
                    label="Gender"
                  ></v-select>
                </v-col>

                <v-col cols="12" md="6">
                  <v-select
                    v-model="state.type"
                    :items="categoryItems"
                    label="Category"
                  ></v-select>
                </v-col>

                <v-col cols="12">
                  <v-card-title>
                    <span class="vBar">Owner Information</span>
                  </v-card-title>
                </v-col>

                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="state.firstName"
                    label="First name"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="state.lastName"
                    label="Last name"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="state.ownerAge"
                    label="Age"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="state.contact"
                    label="Contact number"
                  ></v-text-field>
                </v-col>

                <v-col>
                  <v-text-field
                    v-model="state.address"
                    label="Address"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="blue-darken-1"
              variant="text"
              @click="state.dialogEdit = false"
            >
              Close
            </v-btn>
            <v-btn color="blue-darken-1" variant="text" @click="updateSave">
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>

    <div class="pgap">
      <p>Breed:</p>
      <span>{{ petAPI.breed }}</span>
      <p>Date of Birth:</p>
      <span>{{ petAPI.birth }}</span>
      <p>Age:</p>
      <span>{{ petAPI.petAge }}</span>
      <p>Gender:</p>
      <span>{{ petAPI.gender }}</span>
      <p>Category:</p>
      <span>{{ categoryOutline.type }}</span>
    </div>
    <div class="pgap">
      <p>Owner name:</p>
      <span>{{ ownerAPI.firstName }}</span>
      <p>Last name:</p>
      <span>{{ ownerAPI.lastName }}</span>
      <p>Age:</p>
      <span>{{ ownerAPI.ownerAge }} years old</span>
      <p>Contact no:</p>
      <span>{{ ownerAPI.contact }}</span>
      <p>Adress:</p>
      <span class="d-inline-block text-truncate" style="max-width: 100px">
        {{ ownerAPI.address }}
      </span>
    </div>
  </div>

  <!-- --------MEDICAL------------- -->
  <div class="head4">
    <div class="head5">
      <h3 class="vBar">Basic Vaccination</h3>
      <v-progress-circular
        :rotate="360"
        :size="30"
        :width="3"
        :model-value="vaxProgress"
        color="teal"
      >
        <template v-slot:default> {{ vaxProgress }} % </template>
      </v-progress-circular>
    </div>

    <div>
      <v-dialog v-model="state.dialogMed" persistent width="550">
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
              :append-inner-icon="state.visible ? 'mdi-eye-off' : 'mdi-eye'"
              :type="state.visible ? 'text' : 'password'"
              density="compact"
              placeholder="Enter your password"
              prepend-inner-icon="mdi-lock-outline"
              color="blue-darken-1"
              variant="outlined"
              @click:append-inner="state.visible = !state.visible"
            ></v-text-field>
          </v-container>
          <v-card-actions class="actionbtn">
            <v-spacer></v-spacer>
            <v-btn
              class="actionbtn"
              color="blue-darken-1"
              variant="text"
              @click="state.dialogMed = false"
            >
              Cancel
            </v-btn>
            <v-btn
              class="actionbtn"
              color="blue-darken-1"
              variant="text"
              @click="state.dialogMed = false"
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
import { rules } from "~/composables/rules";
import { useUpdateRecord } from "~/stores/updateRecord";
import { storeToRefs } from "pinia";

definePageMeta({
  middleware: ["auth"],
});

// store pinia state
const store = useUpdateRecord();
const { pet, category, owner } = storeToRefs(store);
const { updateRecordInfo } = store;

// REST APIs
const route = useRoute();
const { slugCategory, slugPet } = route.params as QueryCategoryPet;
const meta = await useMeta();
const categories = meta.value.categories;
const petAPI = await usePet(slugCategory, slugPet);
const ownerAPI = await useOwner(slugCategory, slugPet);
const categoryOutline = computed(() =>
  categories.find(
    (category: any) => category.slugCategory === route.params.slugCategory
  )
);

onMounted(async () => {
  try {
    //pet
    state.petName = petAPI.value.petName;
    state.breed = petAPI.value.breed;
    state.birth = petAPI.value.birth;
    state.petAge = petAPI.value.petAge;
    state.gender = petAPI.value.gender;

    //category
    state.type = categoryOutline.value.type;

    //owner
    state.firstName = ownerAPI.value.firstName;
    state.lastName = ownerAPI.value.lastName;
    state.ownerAge = ownerAPI.value.ownerAge;
    state.contact = ownerAPI.value.contact;
    state.address = ownerAPI.value.address;
  } catch (e) {
    console.log(e);
  }
});
//console.log(typeof petAPI.value?.petAge);

// profile reactive state
const state = reactive({
  visible: false,
  dialog: false,
  dialogEdit: false,
  dialogMed: false,

  //pet
  petName: "",
  breed: "",
  birth: "",
  petAge: 0,
  gender: "",

  //category
  type: "",

  //owner
  firstName: "",
  lastName: "",
  ownerAge: 0,
  contact: 0,
  address: "",
});
//console.log(petAPI.value.birth);
// console.log(typeof state.petAge);

const genderItems = ["Female", "Male"];
const categoryItems = ["Avian", "Canine", "Feline", "Herd", "Piscine"];
const rulesImage = rules();

const updateSave = () => {
  pet.value.petName = state.petName;
  pet.value.breed = state.breed;
  pet.value.birth = state.birth;
  pet.value.petAge = +state.petAge;
  pet.value.gender = state.gender;

  category.value.type = state.type;

  owner.value.firstName = state.firstName;
  owner.value.lastName = state.lastName;
  owner.value.ownerAge = +state.ownerAge;
  owner.value.contact = +state.contact;
  owner.value.address = state.address;

  updateRecordInfo();

  console.log(typeof pet.value.petAge);
};
</script>
