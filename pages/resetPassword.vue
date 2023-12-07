<template>
  <v-sheet
    elevation="12"
    max-width="600"
    rounded="lg"
    class="pa-4 mx-auto ma-15"
  >
    <div>
      <v-img
        class="mx-auto my-5"
        max-width="125"
        src="@/assets/images/vueti.png"
      ></v-img>

      <v-form v-model="form" ref="resetForm" @submit.prevent="resetPassword">
        <h2 class="logh2">Forgot your password?</h2>
        <p class="pagh">
          Please enter your email address. You will receive a link to create a
          new password via email.
        </p>
        <!-- Email -->

        <v-text-field
          label="Enter email address"
          persistent-hint
          variant="outlined"
          v-model="email"
          :rules="emailRules"
        ></v-text-field>

        <span class="success pagh">{{ successMsg }}</span>

        <!-- Button -->
        <v-row align="center" justify="center">
          <v-col class="mx-auto mt-3 mb-4" max-width="500">
            <v-btn
              type="submit"
              :disabled="!form"
              :loading="loading"
              block
              size="x-large"
              color="blue-darken-1"
              variant="flat"
            >
              Send Email</v-btn
            >
          </v-col>
        </v-row>
      </v-form>
    </div>
    <div class="inktext" align="center">
      <NuxtLink class="n-link" to="/">Cancel</NuxtLink>
    </div>
  </v-sheet>
</template>

<script setup lang="ts">
const form = ref(false);
const loading = ref(false);
const email = ref("");
const resetForm = ref();

// Reset Auth
const successMsg = ref("");
const supabase = useSupabaseClient();

const resetPassword = async () => {
  if (!form.value) return;
  loading.value = true;

  try {
    const { data, error } = await supabase.auth.resetPasswordForEmail(
      email.value,
      {
        redirectTo: "http://localhost:3000/updateUser",
      }
    );

    if (error) throw error;

    if (data) {
      successMsg.value =
        "Successfully reset: Check your email to update password";
      loading.value = false;
      resetForm.value.reset();
    }
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
</script>
