<template>
  <!--  List line -->
  <v-card>
    <template v-slot:text>
      <v-text-field
        class="vcardsearch"
        v-model="searchName"
        density="comfortable"
        label="Search pet name.."
        prepend-inner-icon="mdi-magnify"
        single-line
        rounded
        theme="light"
        variant="solo"
        hide-details
      ></v-text-field>
      <div class="item error" v-if="searchName && !filteredList().length">
        <p>No results found!</p>
      </div>
    </template>
  </v-card>

  <v-list class="vcardlist" lines="two">
    <!-- <v-list-subheader>List of Patient</v-list-subheader> -->

    <div class="vlistemcon">
      <div
        class="vlistem"
        v-for="category in meta.categories"
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
                category.petID + "" + "|" + pet.breed
              }}</span>
            </template>
          </v-list-item>
          <v-divider :thickness="2" class="vcardivider" inset></v-divider>
        </NuxtLink>
      </div>

      <div class="vpagin">
        <v-pagination :length="3" rounded="circle"></v-pagination>
      </div>
    </div>
  </v-list>
</template>

<script setup>
import dp from "@/assets/images/corgi.jpeg";

const meta = await useMeta();
//const meta = ref(metaData);

console.log(meta.value.categories);

const categories = meta.value.categories;

console.log(categories);

// const searchNames = meta.value.categories.map((category) => {
//   return category.pets.map((pet) => {
//     const pets = pet.petName;
//     return pets;
//   });
// });

// const searchNames = ["Snoopy", "Tagpi", "Cara"];

// console.log(searchNames);

const filteredList = computed(() => {
  return categories.filter((category) => {
    return category.pets.petName
      .toLowerCase()
      .includes(searchName.value.toLowerCase());
  });
});

console.log(filteredList);

const searchName = ref("");
</script>
