<template>
  <v-sheet
    style="
      background: linear-gradient(
        to left bottom,
        rgba(224, 247, 250, 1),
        rgba(241, 237, 254, 1)
      );
    "
    class="log_sheet mx-auto"
    elevation="14"
    height="auto"
    justify-center
    max-width="600"
  >
    <div>
      <div class="logo_icon">
        <div>
          <img class="small_logo" cover :src="smallicon" />
        </div>

        <div class="btn_x">
          <v-btn variant="text" icon="mdi-close"> </v-btn>
        </div>
      </div>

      <v-form v-model="form" ref="resetForm" @submit.prevent="updateUser">
        <div class="title">Forgot your password?</div>
        <p class="Text">
          Please enter email or new email address and new password.
        </p>
        <!-- Email -->

        <v-text-field
          class="text_field"
          color="teal-lighten-3"
          label="Enter your email"
          persistent-hint
          variant="outlined"
          v-model="email"
          :rules="emailRules"
        ></v-text-field>

        <!-- Password -->
        <v-text-field
          class="text_field"
          color="teal-lighten-3"
          label="Enter your new password"
          variant="outlined"
          v-model="password"
          :rules="[passwordRules.required, passwordRules.min]"
          :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
          :type="visible ? 'text' : 'password'"
          @click:append-inner="visible = !visible"
        ></v-text-field>

        <!-- <span class="success pagh">{{ successMsg }}</span> -->

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
              Update</v-btn
            >

            <!-- <div class="inktext" align="center">
              <NuxtLink v-if="login" class="n-link" to="/">Login</NuxtLink>
            </div> -->
          </v-col>
        </v-row>
      </v-form>
    </div>
  </v-sheet>
  <OverlayMsg
    v-if="msgShow"
    :showMsg="msgShow"
    successMsg="Successfully updated password. Login to continue."
  >
    <NuxtLink class="n-link" to="/">
      <v-btn color="green-lighten-1" variant="flat" block> Login </v-btn>
    </NuxtLink>
  </OverlayMsg>
</template>

<script setup lang="ts">
import smallicon from "@/assets/images/Svueti.png";

const form = ref(false);
const loading = ref(false);
const visible = ref(false);
const email = ref("");
const password = ref("");
const msgShow = ref(false);
const resetForm = ref();

// Update Auth
const supabase = useSupabaseClient();

const updateUser = async () => {
  if (!form.value) return;
  loading.value = true;

  try {
    const { data, error } = await supabase.auth.updateUser({
      password: password.value,
      // redirectTo: "http://localhost:3000",
    });

    if (error) throw error;

    if (data) {
      loading.value = false;
      resetForm.value.reset();
      msgShow.value = true;
      navigateTo("http://localhost:3000/");
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
const passwordRules = {
  required: (value: string) => !!value || "This fiels is required.",
  min: (v: string) => v.length >= 8 || "Min 8 characters",
  emailMatch: () => `The email and password you entered don't match`,
};
</script>
