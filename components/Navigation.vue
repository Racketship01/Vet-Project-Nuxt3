<template>
  <div class="space_bar">
    <v-toolbar
      style="
        background: linear-gradient(
          to left bottom,
          rgba(224, 247, 250, 1),
          rgba(241, 237, 254, 1)
        );
      "
      class="v_bar"
      height="70"
      prominent
    >
      <img :src="logo" cover class="Nicon_logo" />

      <v-toolbar-title class="Logo_name">Vueti-Vet</v-toolbar-title>

      <v-spacer></v-spacer>

      <!-- Sample user -->

      <v-btn class="avtr_icon" icon>
        <v-menu rounded>
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
          <v-card class="v_card">
            <v-card-text>
              <div class="mx-auto text-center">
                <v-avatar>
                  <img v-if="profile" :src="profile" />
                  <span v-else class="text-h6">{{ initials }}</span>
                </v-avatar>
                <div class="title_text">{{ name }}</div>
                <p class="sub_text">
                  {{ email }}
                </p>
                <v-divider class="my-3"></v-divider>
                <v-btn
                  block
                  color="light-blue-lighten-1"
                  variant="outlined"
                  prepend-icon="i-heroicons-arrow-right-start-on-rectangle-16-solid"
                  @click="logout"
                >
                  Logout
                </v-btn>
              </div>
            </v-card-text>
          </v-card>
        </v-menu>
      </v-btn>
    </v-toolbar>
  </div>
</template>

<script setup lang="ts">
import logo from "@/assets/images/Svueti.png";

const user = useSupabaseUser();
const { auth } = useSupabaseClient();

const name = computed(() => user.value?.user_metadata.full_name);
const [firstName, lastName] = name.value.split(" ");

const initials = firstName.slice(0, 1) + lastName.slice(0, 1);

const profile = computed(() => user.value?.user_metadata.avatar_url);
const email = computed(() => user.value?.user_metadata.email);

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
