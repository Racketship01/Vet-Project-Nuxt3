<template>
  <div class="cover">
    <v-app-bar class="nav1">
      <template v-slot:prepend>
        <img :src="imgLogo" class="logo" />
      </template>

      <v-app-bar-title class="title">Vueti-Vet</v-app-bar-title>

      <v-spacer></v-spacer>

      <!-- Sample user -->

      <v-row class="rownav">
        <v-menu class="temp" min-width="100px" rounded>
          <template v-slot:activator="{ props }">
            <v-btn icon v-bind="props">
              <v-avatar v-if="profile" size="large">
                <img :src="profile" />
              </v-avatar>
              <v-avatar v-else size="large" color="brown">
                <span class="text-h6">{{ initials }}</span>
              </v-avatar>
            </v-btn>
          </template>
          <v-card class="vcardnav">
            <v-card-text>
              <div class="mx-auto text-center">
                <v-avatar>
                  <img v-if="profile" :src="profile" />
                  <span v-else class="text-h6">{{ initials }}</span>
                </v-avatar>
                <h3 class="vspanav">{{ name }}</h3>
                <p class="pnav">
                  {{ email }}
                </p>
                <v-divider class="my-3"></v-divider>
                <v-btn block variant="text" @click="logout"> Logout </v-btn>
              </div>
            </v-card-text>
          </v-card>
        </v-menu>
      </v-row>
    </v-app-bar>
  </div>
</template>

<script setup lang="ts">
import logo from "@/assets/images/logo1.png";
const imgLogo = logo;

// const [firstName, lastName] = name.value.split(" ");
// console.log(firstName, lastName);

// const initials1 = () => {
//   const combine = [
//     firstName.slice(0, 1).toUpperCase(),
//     lastName.slice(0, 1).toUpperCase(),
//   ].join("");

//   return combine;
// };

const user = useSupabaseUser();
const { auth } = useSupabaseClient();

const name = computed(() => user.value?.user_metadata.full_name);
const [firstName, lastName] = name.value.split(" ");
console.log(firstName, lastName);
const initials = firstName.slice(0, 1) + lastName.slice(0, 1);

const profile = computed(() => user.value?.user_metadata.avatar_url);
const email = computed(() => user.value?.user_metadata.email);
console.log(email.value);

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
