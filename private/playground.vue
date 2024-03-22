<template>
  <div>
    <!-- <List
        :lists="filteredLists"
        :model-value="searchName"
        @update:model-value="filtersChanged"
      ></List> -->

    <v-list class="vcardlist" lines="two">
      <div class="vlistemcon">
        <v-text-field
          class="vcardsearch"
          v-model="searchName"
          @keyup="filtersChanged"
          density="comfortable"
          label="Search pet name.."
          prepend-inner-icon="mdi-magnify"
          single-line
          rounded
          theme="light"
          variant="solo"
          hide-details
        >
        </v-text-field>
        <div class="item error" v-if="searchName && !filteredLists.length">
          <p>No results found!</p>
        </div>
        <div>
          <div
            class="vlistem"
            v-for="category in displayedLists"
            :key="category.slugCategory"
          >
            <NuxtLink
              class="listLink"
              v-for="pet in category.pets"
              :key="pet.slugPet"
              :to="pet.path"
            >
              <v-list-item :prepend-avatar="dp" :title="pet.petName">
                <template v-slot:subtitle>
                  <span class="font-weight-bold">{{
                    pet.petID + " " + "|" + pet.breed
                  }}</span>
                </template>
              </v-list-item>
              <v-divider :thickness="2" class="vcardivider" inset></v-divider>
            </NuxtLink>
          </div>
        </div>
        <div class="vpagin">
          <div class="pagination">
            <p class="pageText">Page {{ currentPage }}</p>

            <div class="pages">
              <NuxtLink
                v-if="previousPage"
                :to="{ path: '/profile', query: { page: previousPage } }"
                class="linkPagination"
                >Previous
              </NuxtLink>

              <NuxtLink
                v-if="nextPage"
                :to="{ path: '/profile', query: { page: nextPage } }"
                class="linkPagination"
              >
                Next</NuxtLink
              >
            </div>
          </div>

          <!-- <div class="pagination">
              <vue-awesome-paginate
                v-model="currentPage"
                :total-items="totalLists"
                :items-per-page="itemsPerPage"
                :max-pages-shown="pagesShown"
                @page-clicked="handlePageChange"
                :container-class="'pagination-container'"
              />
            </div> -->
        </div>
      </div>
    </v-list>
  </div>
</template>

<script setup>
import dp from "@/assets/images/corgi.jpeg";

const searchName = ref("");
const allLists = ref([]);
const filteredLists = ref([]);

// search
const meta = await useMeta();
const categories = meta.value.categories;
console.log(categories.length);

// pagination 1
const currentPage = useCurrentPage();
const maxPage = computed(() => Math.ceil(filteredLists.value.length / 10));
const { previousPage, nextPage } = usePreviousAndNextPages(
  currentPage,
  maxPage
);

// pagination 2
// const currentPage = ref(1);
// const itemsPerPage = ref(10);
// const totalLists = ref(0);
// const pagesShown = ref(1);

// const handlePageChange = (data) => {
//   currentPage.value = data.currentPage;
// };

onMounted(async () => {
  try {
    allLists.value = categories;
    filteredLists.value = categories;
    totalLists.value = categories.length;
    pagesShown.value = Math.ceil(totalLists.value / itemsPerPage.value);
    //await refreshNuxtData();
  } catch (e) {
    console.log(e);
  }
});

// If the search content in the pet is blank, the original data is returned.
watch(searchName, async () => {
  if (searchName.value.length <= 0) {
    filteredLists.value = allLists.value;
  }
});

const filtersChanged = () => {
  if (searchName.value.length > 0) {
    // get text field
    const findText = searchName.value.toLocaleLowerCase();
    // find text
    const result = allLists.value.filter((pet) => {
      const petName = pet.pets[0]["petName"].toLowerCase();
      return petName.includes(findText);
    });

    filteredLists.value = result;
    //console.log(filteredLists.value);
  }
};

const displayedLists = computed(() => {
  const pageNumber = currentPage.value;
  const firstListIndex = (pageNumber - 1) * 10;
  const lastListIndex = pageNumber * 10;
  return filteredLists.value.slice(firstListIndex, lastListIndex);
});
//console.log(displayedLists.value);

// const displayedLists = computed(() => {
//   const firstListIndex =
//     currentPage.value * itemsPerPage.value - itemsPerPage.value;

//   const lastListIndex = firstListIndex + itemsPerPage.value;
//   return filteredLists.value.slice(firstListIndex, lastListIndex);
// });
</script>

<style>
.pagination-container {
  display: flex;
  column-gap: 15px;
}
.paginate-buttons {
  height: 40px;
  width: 40px;
  border-radius: 20px;
  cursor: pointer;
  background-color: rgb(242, 242, 242);
  border: 1px solid rgb(217, 217, 217);
  color: black;
}
.paginate-buttons:hover {
  background-color: #d8d8d8;
}
.active-page {
  background-color: #3498db;
  border: 1px solid #3498db;
  color: white;
}
.active-page:hover {
  background-color: #2988c8;
}
</style>

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
            <MedicalHxTable title="Annual Vaccination" />
          </div>
          <div>
            <MedicalHxTable title="Medical History" />
          </div>
        </div>
      </v-card>
    </v-col>
  </div>

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
  dialog: false,
  dialogEdit: false,
  dialogMed: false,
  dialogDelete: false,

  loadingEditInfo: false,
  loadingDel: false,

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
</script>

<template v-slot:activator="{ props: activatorProps }">
  <v-btn
    color="blue-lighten-1"
    text="Medical History"
    variant="outlined"
    v-bind="activatorProps"
  ></v-btn>
</template>

<!-- ----------PrimaryVax -->
<template>
  <v-data-table
    :headers="headers"
    :items="records"
    :sort-by="[{ key: 'calories', order: 'asc' }]"
  >
    <template v-slot:top>
      <v-toolbar flat class="tBar">
        <v-toolbar-title>Pets Primary Vaccination</v-toolbar-title>

        <!-- <v-btn icon="mdi-chevron-right" ></v-btn> -->

        <v-divider class="mx-6" :thickness="3" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ props }">
            <v-btn variant="outlined" dark class="mb-2" v-bind="props">
              New Item
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.name"
                      label="Age"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      type="date"
                      v-model="editedItem.date"
                      label="Date"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.weight"
                      label="Weight"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="12">
                    <v-text-field
                      v-model="editedItem.description"
                      label="Description"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      type="date"
                      v-model="editedItem.followupCheckup"
                      label="Followup Checkup"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      v-model="editedItem.veterinarian"
                      label="Veterinarian"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue-darken-1" variant="text" @click="close">
                Cancel
              </v-btn>
              <v-btn color="blue-darken-1" variant="text" @click="save">
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <!-- <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5"
              >Are you sure you want to delete this item?</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue-darken-1" variant="text" @click="closeDelete"
                >Cancel</v-btn
              >
              <v-btn
                color="blue-darken-1"
                variant="text"
                @click="deleteItemConfirm"
                >OK</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog> -->
      </v-toolbar>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon size="small" class="me-2" @click="editItem(item)">
        mdi-pencil
      </v-icon>
      <!-- <v-icon size="small" @click="deleteItem(item)"> mdi-delete </v-icon> -->
    </template>

    <template v-slot:[`item.remarks`]="{ item }">
      <CompleteButton
        :model-value="progress"
        @update:model-value="toggleComplete(item)"
      />
    </template>
  </v-data-table>
</template>

<script setup>
const dialog = ref(false);
const dialogDelete = ref(false);

const expanded = ref([]);
const headers = [
  {
    title: "AGE",
    align: "start",
    sortable: false,
    key: "name",
  },
  { title: "DATE", key: "date" },
  { title: "WEIGHT", key: "weight" },
  { title: "DESCRIPTION", key: "description" },
  { title: "FOLLOWUP CHECKUP", key: "followupCheckup" },
  { title: "VETERINARIAN", key: "veterinarian" },
  { title: "REMARKS", key: "remarks", sortable: false },
  { title: "ACTIONS", key: "actions", sortable: false },
];
const records = ref([]);
const editedIndex = ref(-1);
const editedItem = ref({
  name: "",
  date: "",
  weight: "",
  description: "",
  followupCheckup: "",
  veterinarian: "",
  remarks: "",
});
const defaultItem = ref({
  name: "",
  date: "",
  weight: "",
  description: "",
  followupCheckup: "",
  veterinarian: "",
  remarks: "",
});

const formTitle = computed(() => {
  return editedIndex.value === -1 ? "New Item" : "Edit Item";
});

watch(() => {
  const dialog = () => {
    dialog.value ? val : close();
  };

  const dialogDelete = () => {
    dialogDelete.value ? val : closeDelete();
  };
});

const editItem = (item) => {
  editedIndex.value = records.value.indexOf(item);
  editedItem.value = Object.assign({}, item);
  dialog.value = true;
};

const deleteItem = (item) => {
  editedIndex.value = records.value.indexOf(item);
  editedItem.value = Object.assign({}, item);
  dialogDelete.value = true;
};

const deleteItemConfirm = () => {
  records.value.splice(editedIndex.value, 1);
  closeDelete();
};

const progress = ref(false);
const toggleComplete = (item) => {
  editedIndex.value = records.value.indexOf(item);
  editedItem.value = Object.assign({}, item);
  return (progress.value = !progress.value);
};

const close = () => {
  dialog.value = false;
  nextTick(() => {
    editedItem.value = Object.assign({}, defaultItem.value);
    editedIndex.value = -1;
  });
};

const closeDelete = () => {
  dialogDelete.value = false;
  nextTick(() => {
    editedItem.value = Object.assign({}, defaultItem.value);
    editedIndex.value = -1;
  });
};

const save = () => {
  if (editedIndex.value > -1) {
    Object.assign(records.value[editedIndex.value], editedItem.value);
  } else {
    records.value.push(editedItem.value);
  }

  close();
};
</script>
