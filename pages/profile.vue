<template>
  <v-sheet class="container" elevation="4" rounded>
    <div class="navigation">
      <Navigation />
    </div>

    <div class="record">
      <div class="profileForm">
        <ProfileForm />
      </div>
      <div class="profile">
        <!-- <PetRecord /> -->
        <ProfileList />
        <!-- <NuxtPage /> -->
      </div>
    </div>
  </v-sheet>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ["auth"],
});
</script>
