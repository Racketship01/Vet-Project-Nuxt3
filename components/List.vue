<template>
  <!--  List line -->

  <div>
    <v-text-field
      type="search"
      class="vcardsearch"
      :value="modelValue"
      @keyup="() => $emit('update:modelValue', modelValue)"
      density="comfortable"
      label="Search pet name.."
      prepend-inner-icon="mdi-magnify"
      single-line
      rounded
      theme="light"
      variant="solo"
      hide-details
    ></v-text-field>
    <!-- <div class="item fruit" v-for="name in filteredList" :key="name">
      <p>{{ name}}</p>
    </div>
        <div class="item error" v-if="searchName && !filteredList.length">
          <p>No results found!</p>
        </div> -->

    <v-list class="vcardlist" lines="two">
      <div class="vlistemcon">
        <div class="vlistem" v-for="category in lists" :key="category.petID">
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

        <div class="vpagin">
          <v-pagination :length="3" rounded="circle"></v-pagination>
        </div>
      </div>
    </v-list>
  </div>
</template>

<script setup>
import dp from "@/assets/images/corgi.jpeg";

// export interface List {
//     title: String,
//     categories: String[],
//     type: String,
//     slugCategory: String,
//     petID: String,
//     pets: String[],
//     petName: String,
//     slugPet: String,
//     breed: String,
//     path: String
// }

const props = defineProps({
  lists: {
    type: Array,
    required: true,
  },
  modelValue: {
    type: String,
    required: true,
  },
});

// const props = withDefaults(defineProps<{
//     title: String,
//     categories: Array,
//     type: String,
//     slugCategory: String,
//     petID: String,
//     pets: Array,
//     petName: String,
//     slugPet: String,
//     breed: String,
//     path: String
// }>(), {
//     lists: {
//         type: String<any>[],
//         required: true,
// },
// modelValue:{
//     type: String,
//     required: true,
// }
// })

defineEmits(["update:modelValue"]);
</script>
