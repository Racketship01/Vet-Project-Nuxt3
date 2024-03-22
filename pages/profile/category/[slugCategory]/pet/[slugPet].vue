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

      <!-- --------UPDATE INFORMATION------------- -->
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
          <v-form ref="validate">
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
              <v-btn
                :loading="loadingEditInfo"
                color="blue-darken-1"
                variant="text"
                @click.prevent="updateInfoSave"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-form>
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
  <v-col cols="12" md="8">
    <h3 class="vBar">Medical Information</h3>
  </v-col>

  <v-col cols="12" md="6">
    <v-card>
      <h3 class="remark_h">Remarks:</h3>
      <v-divider class="border-opacity-75" color="info"></v-divider>
      <p class="rmp">Take clidkem once a day</p>
      <v-divider class="border-opacity-75" color="info"></v-divider>
      <p class="rmp">Take clidkem once a day</p>
      <v-divider class="border-opacity-75" color="info"></v-divider>
      <p class="rmp">Take clidkem once a day</p>
      <v-divider class="border-opacity-75" color="info"></v-divider>
      <p class="rmp">Take clidkem once a day</p>
      <v-divider class="border-opacity-75" color="info"></v-divider>
      <p class="rmp">Take clidkem once a day</p>
    </v-card>
  </v-col>
  <v-col class="med_InfoD" cols="12" md="5">
    <!-- <img height="150" width="170" cover :src="img" /> -->

    <v-dialog v-model="state.dialogMedical" width="auto" scrollable>
      <template v-slot:activator="{ props: activatorProps }">
        <v-btn
          color="blue-lighten-1"
          text="Medical History"
          variant="outlined"
          v-bind="activatorProps"
        ></v-btn>
      </template>

      <v-card>
        <v-card-actions>
          <div class="medialog">Medical History</div>
          <v-spacer></v-spacer>
          <div>
            <v-dialog v-model="state.dialogMed" persistent width="550">
              <template v-slot:activator="{ props }">
                <v-btn
                  class="btn_medialog"
                  color="blue-darken-1"
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
                    v-model="state.password"
                    :append-inner-icon="
                      state.visible ? 'mdi-eye-off' : 'mdi-eye'
                    "
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
                    @click="medicalPassword"
                  >
                    Confirm
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </div>
        </v-card-actions>
        <v-divider class="mt-3"></v-divider>
        <v-col cols="auto" class="overflow-auto">
          <v-card
            width="auto"
            height="500"
            class="overflow-auto"
            v-if="state.showTable"
          >
            <div class="tbdvder">
              <div>
                <PrimaryVaxTable />
              </div>
              <div>
                <AnnualVaxTable />
              </div>
              <div>
                <MedicalHxTable title="Medical History" />
              </div>
            </div>
          </v-card>
        </v-col>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="blue-darken-1"
            text="Close"
            variant="text"
            @click="closeMedicalHistory"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <img height="150" width="170" cover :src="img" />
  </v-col>
  <div class="btn">
    <v-btn color="blue-darken-1" variant="flat" size="large" @click="backBtn">
      Back
    </v-btn>

    <v-dialog v-model="state.dialogDelete" persistent width="550">
      <template v-slot:activator="{ props }">
        <v-btn color="blue-darken-1" variant="flat" size="large" v-bind="props">
          Delete
        </v-btn>
      </template>

      <v-card>
        <v-form ref="validate">
          <v-container>
            <div
              class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between"
            >
              Are you sure you want to DELETE this record?
            </div>
          </v-container>
          <v-card-actions class="actionbtn">
            <v-spacer></v-spacer>
            <v-btn
              class="actionbtn"
              color="blue-darken-1"
              variant="text"
              @click="state.dialogDelete = false"
            >
              Cancel
            </v-btn>
            <v-btn
              class="actionbtn"
              color="blue-darken-1"
              variant="text"
              :loading="loadingDel"
              @click="deleteRecord"
            >
              Confirm
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
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

// profile reactive state
const validate = ref();

const state = reactive({
  visible: false,
  dialogEdit: false,
  dialogMed: false,
  dialogDelete: false,
  dialogMedical: false,

  loadingEditInfo: false,
  loadingDel: false,

  password: "",
  showTable: false,

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

const genderItems = ["Female", "Male"];
const categoryItems = ["Avian", "Canine", "Feline", "Herd", "Piscine"];
const rulesImage = rules();

// Method
const updateInfoSave = async () => {
  state.loadingEditInfo = true;

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

  const { valid } = await validate.value.validate();
  if (valid) {
    alert("Updating was successfull");
    state.loadingEditInfo = false;
    state.dialogEdit = false;
  }
};

const deleteRecord = async () => {
  try {
    await $fetch(
      `/api/profile/category/${slugCategory}/pet/${slugPet}/deleteRecord`,
      {
        method: "DELETE",
      }
    );

    const { valid } = await validate.value.validate();
    if (valid) {
      alert("Deleting was successfull");
      state.loadingDel = false;
      await refreshNuxtData();
      // navigateTo("/profile");
    }
  } catch (err) {
    console.log(err);
  }
};

const backBtn = () => {
  navigateTo("/profile");
};

const medicalPassword = () => {
  if (state.password === "Star@1155") {
    state.showTable = true;
    state.dialogMed = false;
  }
};

const closeMedicalHistory = () => {
  state.dialogMedical = false;
  state.showTable = false;
  state.password = "";
};
</script>
