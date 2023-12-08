<template>
  <v-sheet
    elevation="12"
    max-width="600"
    rounded="lg"
    class="pa-4 mx-auto ma-10"
  >
    <div>
      <LazyImages />

      <h1 class="logh1">Login</h1>

      <!-- Email -->
      <v-form v-model="form" @submit.prevent="loginWithEmail">
        <v-text-field
          v-model="email"
          :readonly="loading"
          label="Your Email"
          persistent-hint
          variant="outlined"
          :rules="emailRule"
        ></v-text-field>

        <!-- Password -->
        <v-text-field
          v-model="password"
          :readonly="loading"
          class="vfield"
          label="Enter Password"
          variant="outlined"
          :rule="passwordRule"
          :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
          :type="visible ? 'text' : 'password'"
          @click:append-inner="visible = !visible"
        ></v-text-field>

        <!-- Forget -->
        <NuxtLink class="n-link" to="/resetPassword">
          Forgot login password?</NuxtLink
        >

        <!-- Button -->

        <v-row align="center" justify="center">
          <v-col class="mx-auto mt-4" max-width="500">
            <v-btn
              :disabled="!form"
              :loading="loading"
              block
              type="submit"
              size="x-large"
              color="blue-darken-1"
              variant="flat"
            >
              Login</v-btn
            >
          </v-col>
        </v-row>
      </v-form>

      <!-- Auth Icon -->
      <h3 class="htxt">OR</h3>

      <v-container class="text-center">
        <v-row justify="center" dense>
          <v-col align="center" v-for="(shortcut, i) in shortcuts" :key="i">
            <v-btn
              @click="shortcut.auth"
              :loading="loading"
              class="vcard1 pa-2"
              variant="tonal"
              color="grey-darken-1"
            >
              <Icon size="25" :name="shortcut.icon" />

              <div class="captxt" v-text="shortcut.title"></div>
            </v-btn>
          </v-col>
        </v-row>
      </v-container>

      <!-- register link -->

      <div class="inktext" align="center">
        <span>Not yet register?</span>
        <NuxtLink class="n-link" to="/signUp">Signup Here</NuxtLink>
      </div>
    </div>
  </v-sheet>
</template>

<script setup lang="ts">
const form = ref(false);
const email = ref("");
const password = ref("");
const loading = ref(false);
const visible = ref(false);

// Supabase
const supabase = useSupabaseClient();
const user = useSupabaseUser();

// watchEffect(async () => {
//   if (user.value) {
//     await navigateTo("/profile", {
//       replace: true,
//     });
//   }
// });

// Email Auth
const loginWithEmail = async () => {
  if (!form.value) return;

  const redirectTo = navigateTo("/profile");
  try {
    const { error } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    });
    if (error) throw error;
    loading.value = true;
    return redirectTo;
  } catch (error) {
    console.error(error);
  }
};

// Provider Auth
const loginWithGoogle = async () => {
  const redirectTo = navigateTo("/profile");
  try {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
    if (error) throw error;
    loading.value = true;
    return redirectTo;
  } catch (error) {
    console.error(error);
  }
};

const loginWithFacebook = async () => {
  const redirectTo = navigateTo("/profile");
  try {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "facebook",
    });
    if (error) throw error;
    loading.value = true;
    return redirectTo;
  } catch (error) {
    console.error(error);
  }
};

const emailRule = [
  (value: string) => {
    if (value) return true;
    return "E-mail is requred.";
  },
  (value: string) => {
    if (/.+@.+\..+/.test(value)) return true;
    return "E-mail must be valid.";
  },
];

const passwordRule = (value: string) => !!value || "This field is required.";

const shortcuts = [
  {
    icon: "logos:google-icon",
    title: "Google",
    auth: () => loginWithGoogle(),
  },
  {
    icon: "logos:facebook",
    title: "Facebook",
    auth: () => loginWithFacebook(),
  },
];
</script>
