<template>
  <div class="vsheetlog">
    <v-sheet
      class="log_sheet mx-auto"
      elevation="14"
      height="auto"
      justify-center
      max-width="600"
      style="
        background: linear-gradient(
          to left bottom,
          rgba(224, 247, 250, 1),
          rgba(241, 237, 254, 1)
        );
      "
    >
      <div>
        <div class="img-logC">
          <img class="img-logi" :src="icon" />
        </div>
        <div class="head_title">Login</div>

        <!-- Email -->
        <v-form v-model="form" @submit.prevent="loginWithEmail">
          <v-text-field
            class="text_field"
            v-model="email"
            :readonly="loading"
            color="teal-lighten-3"
            label="Your Email"
            persistent-hint
            variant="outlined"
            :rules="emailRules"
          ></v-text-field>

          <!-- Password -->
          <v-text-field
            v-model="password"
            :readonly="loading"
            class="text_field"
            color="teal-lighten-3"
            label="Enter Password"
            variant="outlined"
            :rules="passwordLog"
            :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
            :type="visible ? 'text' : 'password'"
            @click:append-inner="visible = !visible"
          ></v-text-field>

          <!-- Forget -->
          <div class="link1">
            <NuxtLink
              class="link2"
              to="/resetPassword"
              rel="noopener noreferrer"
              target="_blank"
            >
              Forgot login password?</NuxtLink
            >
          </div>

          <!-- Button -->

          <v-row align="center" justify="center">
            <v-col class="mx-auto mt-4 mb-4" max-width="500">
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
        <UDivider
          label="OR"
          :ui="{ label: 'text-sky-300 dark:text-blue-400' }"
        />

        <v-container class="ccc">
          <v-row justify="center" dense>
            <v-col align="center" v-for="(shortcut, i) in shortcuts" :key="i">
              <v-card
                @click="shortcut.auth"
                :loading="shortcut.load"
                class="vcard pa-2"
                variant="tonal"
                color="grey-darken-1"
                target="_blank"
              >
                <Icon size="25" :name="shortcut.icon" />

                <div class="card_social" v-text="shortcut.title"></div>
              </v-card>
            </v-col>
          </v-row>
        </v-container>

        <!-- register link -->

        <div class="link_text" align="center">
          <span>Not yet register?</span>
          <NuxtLink class="page_link" to="/signUp">Signup Here</NuxtLink>
        </div>
      </div>
    </v-sheet>
  </div>
</template>

<script setup lang="ts">
import icon from "@/assets/images/Svueti.png";
import auth from "~/middleware/auth";

const form = ref(false);
const email = ref("");
const password = ref("");
const loading = ref(false);
const loadingGoogle = ref(false);
const loadingFacebook = ref(false);
const visible = ref(false);

const emailRules = emailRule();
const { passwordLog } = passwordRule();

// Supabase Auth
const supabase = useSupabaseClient();
const user = useSupabaseUser();

watchEffect(async () => {
  if (user.value) {
    await navigateTo("/profile", {
      replace: true,
    });
  }
  return navigateTo("/");
});

// definePageMeta({
//   middleware: auth,
// });

// Email
const loginWithEmail = async () => {
  if (!form.value) return;
  console.log(email.value);

  const redirectTo = navigateTo("/profile");
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value,
      options: { redirectTo },
    });
    if (data) loading.value = true;
    if (error) throw error;
    //return redirectTo;
  } catch (error) {
    console.error(error);
  }
};

// Google
const loginWithGoogle = async () => {
  const redirectTo = navigateTo("/profile");
  try {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo },
    });
    if (error) throw error;
    loadingGoogle.value = true;
    //return redirectTo;
  } catch (error) {
    console.error(error);
  }
};

// Facebook
const loginWithFacebook = async () => {
  const redirectTo = navigateTo("/profile");
  try {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "facebook",
      options: { redirectTo },
    });
    if (error) throw error;
    loadingFacebook.value = true;
    // return redirectTo;
  } catch (error) {
    console.error(error);
  }
};

const shortcuts = [
  {
    icon: "logos:google-icon",
    title: "Google",
    load: loadingGoogle.value,
    auth: () => loginWithGoogle(),
  },
  {
    icon: "logos:facebook",
    title: "Facebook",
    load: loadingFacebook.value,
    auth: () => loginWithFacebook(),
  },
];
</script>
