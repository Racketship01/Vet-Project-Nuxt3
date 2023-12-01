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
        <!-- <ProfileForm /> -->
        <NuxtPage />
      </div>
    </div>
  </v-sheet>
</template>
