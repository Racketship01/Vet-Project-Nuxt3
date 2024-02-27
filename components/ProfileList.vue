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
          <div class="pagination"></div>
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
          <!-- <v-pagination :length="3" rounded="circle"></v-pagination> -->
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
//console.log(categories);

// pagination
const currentPage = useCurrentPage();
const maxPage = computed(() => Math.ceil(filteredLists.value.length / 10));
const { previousPage, nextPage } = usePreviousAndNextPages(
  currentPage,
  maxPage
);

onMounted(async () => {
  try {
    allLists.value = categories;
    filteredLists.value = categories;
    await refreshNuxtData();
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
</script>
