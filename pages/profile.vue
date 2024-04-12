<template>
  <v-sheet class="container" elevation="14" rounded>
    <div class="navigation">
      <Navigation />
    </div>

    <div class="record">
      <div class="profileForm">
        <ProfileForm />
        <!-- <medical-hx-table /> -->

        <!-- <annual-vax-table /> -->
      </div>

      <div class="profile">
        <NuxtPage v-if="slugCategory && slugPet" />
        <ProfileList v-else />
      </div>
    </div>
  </v-sheet>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ["auth"],
  key: (route: any) => route.fullPath,
});

const route = useRoute();
const { slugCategory, slugPet } = route.params;
</script>
