<template>
  <v-data-table
    :headers="headers"
    :items="records"
    :sort-by="[{ key: 'date', order: 'asc' }]"
  >
    <template v-slot:top>
      <v-toolbar flat class="tBar">
        <v-toolbar-title>Medical History</v-toolbar-title>

        <v-divider class="mx-6" :thickness="3" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ props }">
            <v-btn variant="outlined" dark class="mb-2" v-bind="props">
              New Record
            </v-btn>
          </template>
          <v-card class="newcrd_form">
            <v-card-title class="vcard_title">
              <span class="span_title">{{ formTitle }}</span>
            </v-card-title>

            <v-form>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        type="age"
                        v-model="state.age"
                        label="Age"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        type="date"
                        v-model="state.date"
                        label="Date"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        type="weight"
                        v-model="state.weight"
                        label="Weight"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="12">
                      <v-text-field
                        v-model="state.description"
                        label="Description"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        type="date"
                        v-model="state.followUp"
                        label="Followup Checkup"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        v-model="state.veterinarian"
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
            </v-form>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>

    <template v-slot:[`item.actions`]="{ item }">
      <v-icon size="small" class="me-2" @click="editItem(item)">
        mdi-pencil
      </v-icon>
    </template>
  </v-data-table>
</template>

<script setup>
import { useMedical } from "~/stores/medicalHx";
import { storeToRefs } from "pinia";

//REST Apis
const route = useRoute();
const { slugCategory, slugPet } = route.params;
const getMedicalHx = await useMedicalHx(slugCategory, slugPet);
console.log(getMedicalHx.value);

// store pinia state
const store = useMedical();
const { medicalHx } = storeToRefs(store);
const { insertMedical, updateMedical } = store;

onMounted(async () => {
  initialize();
});

// -----LOCAL STATE
const dialog = ref(false);
const headers = [
  {
    title: "AGE",
    align: "start",
    sortable: false,
    key: "age",
  },
  { title: "DATE", key: "date" },
  { title: "WEIGHT", key: "weight" },
  { title: "DESCRIPTION", key: "description" },
  { title: "FOLLOWUP CHECKUP", key: "followUp" },
  { title: "VETERINARIAN", key: "veterinarian" },
  { title: "ACTIONS", key: "actions", sortable: false },
];
const records = ref([]);
const editedIndex = ref(-1);
const state = ref({
  name: "",
  date: "",
  weight: "",
  description: "",
  followUp: "",
  veterinarian: "",
});
const defaultItem = ref({
  age: 0,
  date: "",
  weight: 0,
  description: "",
  followUp: "",
  veterinarian: "",
});
const medicalID = ref();

// ------METHOD
const formTitle = computed(() => {
  return editedIndex.value === -1 ? "New Item" : "Edit Item";
});

watch(() => {
  const dialog = () => {
    dialog.value ? val : close();
  };
});

const editItem = (item) => {
  editedIndex.value = records.value.indexOf(item);
  state.value = reactive(Object.assign(records.value[editedIndex.value], item));
  medicalID.value = records.value[editedIndex.value]["id"];
  dialog.value = true;
  //primaryVax.value = state.value;
};

const close = () => {
  dialog.value = false;
  nextTick(() => {
    state.value = Object.assign({}, defaultItem.value);
    editedIndex.value = -1;
    // reloadNuxtApp();
  });
};

const postMedical = () => {
  medicalHx.value.age = +state.value.age;
  medicalHx.value.date = state.value.date;
  medicalHx.value.weight = +state.value.weight;
  medicalHx.value.description = state.value.description;
  medicalHx.value.followUp = state.value.followUp;
  medicalHx.value.veterinarian = state.value.veterinarian;
  insertMedical();
};
const putMedical = () => {
  medicalHx.value.age = +state.value.age;
  medicalHx.value.date = state.value.date;
  medicalHx.value.weight = +state.value.weight;
  medicalHx.value.description = state.value.description;
  medicalHx.value.followUp = state.value.followUp;
  medicalHx.value.veterinarian = state.value.veterinarian;
  medicalHx.value.id = +medicalID.value;
  updateMedical();
};

const save = () => {
  if (editedIndex.value > -1) {
    Object.assign(records.value[editedIndex.value], state.value);
    putMedical();
    close();
  } else {
    records.value.push(state.value);
    postMedical();
    close();
  }
};

const initialize = () => {
  const medicalHxApi = ref(Object.values(getMedicalHx.value));

  medicalHxApi.value.forEach((vax) => {
    records.value.push(vax);
  });
};
</script>
