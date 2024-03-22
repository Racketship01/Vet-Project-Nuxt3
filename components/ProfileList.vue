<template>
  <div>
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
            v-for="(category, index) in displayedLists"
            :key="index"
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

// pagination
const currentPage = useCurrentPage();

// search
const meta = await useMeta();
const categories = meta.value.categories;

onMounted(async () => {
  try {
    allLists.value = categories;
    updatePage(allLists.value);
    await refreshNuxtData();
  } catch (e) {
    console.log(e);
  }
});

const filtersChanged = () => {
  if (searchName.value.length > 0) {
    // get text field
    const findText = searchName.value.toLowerCase();
    // find text
    const result = allLists.value.filter((pet) => {
      const namePet = pet?.pets[0]["petName"].toLowerCase();

      return namePet.includes(findText);
    });

    updatePage(result);
  }
};

const maxPage = computed(() => Math.ceil(filteredLists.value.length / 10));
const { previousPage, nextPage } = usePreviousAndNextPages(
  currentPage,
  maxPage
);

const updatePage = (updatePets) => {
  filteredLists.value = updatePets ? updatePets : allLists.value;
};

const displayedLists = computed(() => {
  if (searchName.value.length > 0) {
    filtersChanged();
    return filteredLists.value;
  } else {
    updatePage();
    const pageNumber = currentPage.value;
    const firstListIndex = (pageNumber - 1) * 10;
    const lastListIndex = pageNumber * 10;
    return filteredLists.value.slice(firstListIndex, lastListIndex);
  }
});
</script>
