<template>
  <div class="cover">
    <div class="nav">
      <img :src="imgLogo" class="logo" />
      <h1 class="title">Vueti-Vet</h1>
    </div>

    <div>
      <v-btn icon>
        <v-icon>mdi-export</v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script setup>
import logo from "@/assets/images/logo1.png";

const imgLogo = logo;
</script>
