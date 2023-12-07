<template>
  <div class="cover">
    <div class="nav">
      <img :src="imgLogo" class="logo" />
      <h1 class="title">Vueti-Vet</h1>
    </div>

    <div>
      <v-btn @click="logout"> Logout </v-btn>
    </div>
  </div>
</template>

<script setup lang="ts">
import logo from "@/assets/images/logo1.png";

const imgLogo = logo;

const user = useSupabaseUser();
const { auth } = useSupabaseClient();

const logout = async () => {
  const { error } = await auth.signOut();
  if (error) {
    console.error(error);
    return;
  }

  try {
    await $fetch("/api/_supabase/session", {
      method: "POST",
      body: { event: "SIGNED_OUT", session: null },
    });
    user.value = null;
  } catch (e) {
    console.error(error);
  }
  await navigateTo("/");
};
</script>
