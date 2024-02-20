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
          ><div class="item error" v-if="searchName && !filteredLists.length">
            <p>No results found!</p>
          </div></v-text-field
        >
        <div>
          <div
            class="vlistem"
            v-for="category in filteredLists"
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
                    category.petID + " " + "|" + pet.breed
                  }}</span>
                </template>
              </v-list-item>
              <v-divider :thickness="2" class="vcardivider" inset></v-divider>
            </NuxtLink>
          </div>
        </div>
        <div class="vpagin">
          <v-pagination :length="3" rounded="circle"></v-pagination>
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
const filters = ref({
  search: "",
});

onMounted(async () => {
  try {
    const meta = await useMeta();
    allLists.value = meta.value.categories;
    console.log(allLists.value);
    filteredLists.value = meta.value.categories;
  } catch (e) {
    console.log(e);
  }
});

const filtersChanged = () => {
  filters.value.search = searchName.value;

  let search = allLists.value.map((category) => {
    return category.pets.filter(
      (pet) =>
        pet.petName
          ?.toLowerCase()
          .indexOf(filters.value.search.toLocaleLowerCase()) >= 0
    );
    //return category.pets.petName?.toLowerCase().indexOf(searchName.value.toLocaleLowerCase()) >= 0
  });

  const searching = computed(() => (filteredLists.value = search));
  //console.log(filteredLists.value);
  console.log(searching.value);
  return searching.value;
};
</script>
