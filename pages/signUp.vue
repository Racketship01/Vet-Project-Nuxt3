<template>
  <v-sheet
    elevation="12"
    max-width="600"
    rounded="lg"
    class="pa-4 mx-auto ma-15"
  >
    <div>
      <v-img
        class="mx-auto my-5 mb-7"
        max-width="125"
        src="@/assets/images/vueti.png"
      ></v-img>
      <h1 class="logh1">Sign Up</h1>

      <!-- Email -->

      <v-form v-model="form" @submit.prevent="signUp">
        <v-text-field
          :readonly="loading"
          label="Your Email"
          persistent-hint
          variant="outlined"
          v-model="email"
          :rules="emailRules"
        ></v-text-field>

        <!-- Password -->
        <v-text-field
          :readonly="loading"
          class="vfield"
          label="Enter Password"
          variant="outlined"
          v-model="password"
          :rules="[passwordRules.required, passwordRules.min]"
          :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
          :type="visible ? 'text' : 'password'"
          @click:append-inner="visible = !visible"
        ></v-text-field>

        <!-- Button -->
        <v-row align="center" justify="center">
          <v-col class="mx-auto mt-4" max-width="500">
            <v-btn
              type="submit"
              :disabled="!form"
              :loading="loading"
              block
              size="x-large"
              color="blue-darken-1"
              variant="flat"
            >
              Signup</v-btn
            >
            <span class="success">{{ successMsg }}</span>
          </v-col>
        </v-row>
      </v-form>
      <!-- register link -->
      <div class="inktext" align="center">
        <span>Already have an account?</span>
        <NuxtLink class="alink" to="/">Login Here</NuxtLink>
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

// SignUp Auth
const supabase = useSupabaseClient();
const successMsg = ref("");

// const redirectTo = navigateTo("/");
const signUp = async () => {
  if (!form.value) return;
  loading.value = true;

  try {
    const { error } = await supabase.auth.signUp({
      email: email.value,
      password: password.value,
      options: {
        emailRedirectTo: "http://localhost:3000/",
      },
    });
    if (error) throw error;
    successMsg.value = "Check your email to confirm your account.";
  } catch (error) {
    console.error(error);
  }
};

const emailRules = [
  (value: string) => {
    if (value) return true;
    return "E-mail is requred.";
  },
  (value: string) => {
    if (/.+@.+\..+/.test(value)) return true;
    return "E-mail must be valid.";
  },
];
const passwordRules = {
  required: (value: string) => !!value || "This fiels is required.",
  min: (v: string) => v.length >= 8 || "Min 8 characters",
  emailMatch: () => `The email and password you entered don't match`,
};
</script>
