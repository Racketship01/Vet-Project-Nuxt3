<template>
  <v-row>
    <v-col cols="12">
      <v-card class="img_card">
        <img class="bg-grey-lighten-2" height="125" :src="cover" cover />
      </v-card>
    </v-col>

    <v-col cols="12" md="3" sm="12">
      <div class="dp_wrapper">
        <img cover class="pet_dp" :src="dp" />
        <div class="overlay">
          <v-btn
            :rules="rulesImage"
            accept="image/png, image/jpeg, image/bmp"
            class="btn_upload"
            icon="mdi-camera"
          >
          </v-btn>
        </div>
      </div>
    </v-col>

    <v-col cols="12" md="9" sm="12">
      <div class="petname_hd">{{ petAPI.petName }}</div>
    </v-col>

    <v-col cols="12" md="8" sm="12">
      <div class="sub_txt">Basic Information</div>
    </v-col>

    <v-col cols="12" md="4" sm="12">
      <div class="btn_pdialog">
        <!-- --------UPDATE INFORMATION------------- -->
        <v-dialog v-model="state.dialogEdit" persistent width="550">
          <template v-slot:activator="{ props }">
            <v-btn
              color="blue-darken-1"
              prepend-icon="i-heroicons-pencil-solid"
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
    </v-col>

    <v-col cols="12" md="6">
      <div class="info_gap">
        <p class="p">Breed:</p>
        <span>{{ petAPI.breed }}</span>
        <p class="p">Date of Birth:</p>
        <span>{{ petAPI.birth }}</span>
        <p class="p">Age:</p>
        <span>{{ petAPI.petAge }}</span>
        <p class="p">Gender:</p>
        <span>{{ petAPI.gender }}</span>
        <p class="p">Category:</p>
        <span>{{ categoryOutline.type }}</span>
      </div>
    </v-col>

    <v-col cols="12" md="6">
      <div class="info_gap">
        <p class="p">Owner name:</p>
        <span>{{ ownerAPI.firstName }}</span>
        <p class="p">Last name:</p>
        <span>{{ ownerAPI.lastName }}</span>
        <p class="p">Age:</p>
        <span>{{ ownerAPI.ownerAge }} years old</span>
        <p class="p">Contact no:</p>
        <span>{{ ownerAPI.contact }}</span>
        <p class="p">Adress:</p>
        <span class="d-inline-block text-truncate" style="max-width: 100px">
          {{ ownerAPI.address }}
        </span>
      </div>
    </v-col>

    <!-- --------MEDICAL------------- -->
    <v-col cols="12" md="8" sm="12">
      <div class="med_Info">Medical Information</div>
    </v-col>

    <v-col cols="12" md="4" sm="12">
      <div class="btn_pdialog2">
        <v-dialog v-model="state.dialogMed" persistent width="550">
          <template v-slot:activator="{ props }">
            <v-btn
              color="blue-darken-1"
              prepend-icon="i-heroicons-key-16-solid"
              variant="outlined"
              v-bind="props"
            >
              Medical
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
                @click="cancelPassword"
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
        <v-dialog v-model="state.openTable" width="auto">
          <template v-slot:default="{ isActive }">
            <v-card>
              <v-card-actions>
                <div class="medialog">Medical History</div>
                <v-spacer></v-spacer>
              </v-card-actions>
              <v-divider class="mt-3"></v-divider>
              <v-col cols="auto" class="overflow-auto">
                <v-card width="auto" height="500" class="overflow-auto">
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
          </template>
        </v-dialog>
      </div>
    </v-col>

    <v-col cols="12">
      <v-card variant="outlined" class="remarks" height="300">
        <v-card-item>
          <v-card-title> Remarks: </v-card-title>
          <v-card-subtitle> Medical History </v-card-subtitle>
        </v-card-item>

        <!-- Scrolling -->
        <v-virtual-scroll :items="items" height="190">
          <template v-slot:default="{}">
            <v-card-text>
              <p>
                Date: <span>{{ getPrimaryVax.date }}</span>
              </p>
              <p class="subp">Pet Primary Vaccination</p>
              {{ getPrimaryVax.description }}
              <p>
                To be Follow: <span>{{ getPrimaryVax.followUp }}</span>
              </p>
              <br />
              <p>
                Date: <span>{{ getAnnualVax.date }}</span>
              </p>
              <p class="subp">Annual Vaccination</p>
              {{ getAnnualVax.description }}
              <p>
                To be Follow: <span>{{ getAnnualVax.followUp }}</span>
              </p>
              <br />
              <p>
                Date: <span>{{ getMedicalHx.date }}</span>
              </p>
              <p class="subp">Medical Consultation</p>
              {{ getMedicalHx.description }}
              <p>
                To be Follow: <span>{{ getMedicalHx.followUp }}</span>
              </p>
            </v-card-text>
          </template>
        </v-virtual-scroll>
        <!-- Scrolling -->
      </v-card>
    </v-col>

    <v-col cols="12">
      <v-card variant="flat" color="transparent">
        <v-card-actions>
          <v-btn
            class="btn_bck"
            size="large"
            variant="flat"
            color="blue-darken-1"
            @click="backBtn"
          >
            Back
          </v-btn>

          <v-spacer></v-spacer>

          <v-dialog v-model="state.dialogDelete" max-width="500px">
            <template v-slot:activator="{ props }">
              <v-btn
                class="btn_dlte"
                size="large"
                variant="flat"
                color="blue-darken-1"
                v-bind="props"
              >
                Delete
              </v-btn>
            </template>
            <v-card>
              <v-card-title class="vcard_title">
                Are you sure you want to delete this Profile?
              </v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="blue-darken-1"
                  variant="text"
                  @click="state.dialogDelete = false"
                >
                  Cancel
                </v-btn>

                <v-btn
                  color="blue-darken-1"
                  variant="text"
                  @click="deleteRecord"
                >
                  Confirm
                </v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
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
const { pet, owner } = storeToRefs(store);
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

const primaryVaxAPI = await usePrimaryVax(slugCategory, slugPet);
const annualVaxAPI = await useAnnualVax(slugCategory, slugPet);
const medicalHxAPI = await useMedicalHx(slugCategory, slugPet);

const getPrimaryVax = primaryVaxAPI.value[0];
const getAnnualVax = annualVaxAPI.value[0];
const getMedicalHx = medicalHxAPI.value[0];

onMounted(async () => {
  try {
    //pet
    state.breed = petAPI.value.breed;
    state.birth = petAPI.value.birth;
    state.petAge = petAPI.value.petAge;
    state.gender = petAPI.value.gender;

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
  openTable: false,

  loadingEditInfo: false,
  loadingDel: false,

  password: "",
  showTable: false,

  //pet
  breed: "",
  birth: "",
  petAge: 0,
  gender: "",

  //owner
  firstName: "",
  lastName: "",
  ownerAge: 0,
  contact: 0,
  address: "",
});

const genderItems = ["Female", "Male"];
//const categoryItems = ["Avian", "Canine", "Feline", "Herd", "Piscine"];
const rulesImage = rules();
const items = ref(Array.from({ length: 1 }, (k, v) => v + 1));

// Method
const updateInfoSave = async () => {
  state.loadingEditInfo = true;

  pet.value.breed = state.breed;
  pet.value.birth = state.birth;
  pet.value.petAge = +state.petAge;
  pet.value.gender = state.gender;

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

  reloadNuxtApp();
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
      // await refreshNuxtData();
      navigateTo("/profile");
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
    state.openTable = true;
    // state.dialogMed = false;
  }
};

const cancelPassword = () => {
  nextTick(() => {
    state.dialogMed = false;
    state.password = "";
    // reloadNuxtApp();
  });
};

const closeMedicalHistory = () => {
  nextTick(() => {
    state.dialogMed = false;
    state.openTable = false;
    isActive.value = false;
    state.password = "";
    reloadNuxtApp();
  });
};
</script>
