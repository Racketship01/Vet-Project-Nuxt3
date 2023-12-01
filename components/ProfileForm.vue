<template>
  <div>
    <div class="pet">
      <span class="petInfo">Pet Information</span>
      <v-img :aspect-ratio="1" src="@/assets/images/logo.png" cover></v-img>
    </div>
    <v-form>
      <v-text-field v-model="firstName" label="First name"></v-text-field>
      <div>
        <v-text-field v-model="lastName" label="Last name"></v-text-field>
        <v-text-field v-model="lastName" label="Last name"></v-text-field>
        <v-text-field v-model="lastName" label="Last name"></v-text-field>
        <v-text-field v-model="lastName" label="Last name"></v-text-field>
        <v-text-field v-model="lastName" label="Last name"></v-text-field>
      </div>
    </v-form>
  </div>
</template>

<script setup>
const firstName = ref("");
const lastName = ref("");
</script>
