<template>
  <v-data-table
    :headers="headers"
    :items="records"
    :sort-by="[{ key: 'date', order: 'asc' }]"
  >
    <template v-slot:top>
      <v-toolbar flat class="tBar">
        <v-toolbar-title>Pets Primary Vaccination</v-toolbar-title>

        <v-divider class="mx-6" :thickness="3" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ props }">
            <v-btn variant="outlined" dark class="mb-2" v-bind="props">
              New Record
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-form>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        type="age"
                        v-model="primaryVax.age"
                        label="Age"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        type="date"
                        v-model="primaryVax.date"
                        label="Date"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        type="weight"
                        v-model="primaryVax.weight"
                        label="Weight"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="12">
                      <v-text-field
                        v-model="primaryVax.description"
                        label="Description"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        type="date"
                        v-model="primaryVax.followUp"
                        label="Followup Checkup"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        v-model="primaryVax.veterinarian"
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

    <template v-slot:[`item.remarks`]="{ item }">
      <CompleteButton
        :model-value="progress"
        @update:model-value="toggleComplete(item)"
      />
    </template>
  </v-data-table>
</template>

<script setup>
import { usePrimary } from "~/stores/primaryVax";
import { storeToRefs } from "pinia";

//REST Apis
const route = useRoute();
const { slugCategory, slugPet } = route.params;
const getPrimaryVax = await usePrimaryVax(slugCategory, slugPet);
console.log(getPrimaryVax.value);

// store pinia state
const store = usePrimary();
const { primaryVax } = storeToRefs(store);
const { upsertPrimary } = store;

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
  { title: "REMARKS", key: "remarks", sortable: false },
  { title: "ACTIONS", key: "actions", sortable: false },
];
const records = ref([]);
const editedIndex = ref(-1);
const defaultItem = ref({
  age: 0,
  date: "",
  weight: 0,
  description: "",
  followUp: "",
  veterinarian: "",
  remarks: false,
});

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
  primaryVax.value = Object.assign(records.value[editedIndex.value], item);
  dialog.value = true;
};

const progress = ref(false);
const toggleComplete = (item) => {
  editedIndex.value = records.value.indexOf(item);
  primaryVax.value = Object.assign({}, item);
  return (progress.value = !progress.value);
};

const close = () => {
  dialog.value = false;
  nextTick(() => {
    primaryVax.value = Object.assign({}, defaultItem.value);
    editedIndex.value = -1;
  });
};

const postMedical = () => {
  primaryVax.value.age = +primaryVax.value.age;
  primaryVax.value.weight = +primaryVax.value.weight;
  upsertPrimary();
};
//console.log(records.value);

const save = () => {
  if (editedIndex.value > -1) {
    Object.assign(records.value[editedIndex.value], primaryVax.value);
    postMedical();
  } else {
    records.value.push(primaryVax.value);
    postMedical();
  }

  close();
  //console.log(editedItem.value);
  console.log(primaryVax.value);
  console.log(records.value);
};

const initialize = () => {
  const primaryVaxApi = ref(Object.values(getPrimaryVax.value));

  primaryVaxApi.value.forEach((vax) => {
    records.value.push(vax);
  });
};
</script>
~/stores/primaryVax
