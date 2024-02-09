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
        <NuxtPage v-if="categorySlug && petSlug" />
        <ProfileList v-else />
      </div>
    </div>
  </v-sheet>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ["auth"],
});

const { categorySlug, petSlug } = useRoute().params;
</script>
