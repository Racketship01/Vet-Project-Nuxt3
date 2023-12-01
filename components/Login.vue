<template>
  <v-sheet
    elevation="12"
    max-width="600"
    rounded="lg"
    class="pa-4 mx-auto ma-10"
  >
    <div>
      <v-img
        class="mx-auto my-9"
        max-width="200"
        src="@/assets/images/logologin.png"
      ></v-img>

      <h1 class="logh1">Login</h1>

      <!-- Email -->
      <v-form v-model="form" @submit.prevent="onSubmit">
        <v-text-field
          v-model="email"
          :readonly="loading"
          label="Your Email"
          persistent-hint
          variant="outlined"
          :rules="emailRules"
        ></v-text-field>

        <!-- Password -->
        <v-text-field
          v-model="password"
          :readonly="loading"
          class="vfield"
          label="Enter Password"
          variant="outlined"
          :rules="[passwordRules.required, passwordRules.min]"
          :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
          :type="visible ? 'text' : 'password'"
          @click:append-inner="visible = !visible"
        ></v-text-field>

        <!-- Forget -->

        <NuxtLink to="/recover" class="alink">Forgot login password?</NuxtLink>

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
            <v-card
              :href="shortcut.href"
              class="vcard1 pa-2"
              variant="tonal"
              color="grey-darken-1"
              target="_blank"
            >
              <Icon size="25" :name="shortcut.icon" />

              <div class="captxt" v-text="shortcut.title"></div>
            </v-card>
          </v-col>
        </v-row>
      </v-container>

      <!-- register link -->

      <div class="inktext" align="center">
        <span>Not yet register?</span>
        <NuxtLink class="alink" to="/signUp">Signup Here</NuxtLink>
      </div>
    </div>
  </v-sheet>
</template>

<script setup>
const form = ref(false);
const email = ref("");
const password = ref("");
const loading = ref(false);
const visible = ref(false);

const onSubmit = () => {
  if (!form.value) return;

  loading.value = true;

  setTimeout(() => (loading.value = false), 2000);
};

const emailRules = [
  (value) => {
    if (value) return true;
    return "E-mail is requred.";
  },
  (value) => {
    if (/.+@.+\..+/.test(value)) return true;
    return "E-mail must be valid.";
  },
];

const passwordRules = {
  required: (value) => !!value || "This fiels is required.",
  min: (v) => v.length >= 8 || "Min 8 characters",
  emailMatch: () => `The email and password you entered don't match`,
};

const shortcuts = [
  {
    icon: "logos:google-icon",
    title: "Google",
    href: "https://github.com/vuetifyjs/vuetify/tree/dev",
  },
  {
    icon: "logos:facebook",
    title: "Facebook",
    href: "https://github.com/vuetifyjs/vuetify/tree/v2-stable",
  },
];
</script>
