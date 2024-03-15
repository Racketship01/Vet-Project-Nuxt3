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
