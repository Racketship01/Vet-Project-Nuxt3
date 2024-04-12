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

      <v-form v-model="form" ref="resetForm" @submit.prevent="resetPassword">
        <div class="title">Your new password</div>
        <p class="Text">
          Please enter email or new email address and new password.
        </p>
        <!-- Email -->

        <v-text-field
          class="text_field"
          label="Enter your email"
          color="teal-lighten-3"
          variant="outlined"
          v-model="email"
          :rules="emailRules"
        ></v-text-field>

        <!-- <span class="success pagh">{{ successMsg }}</span> -->

        <!-- Button -->
        <v-row align="center" justify="center">
          <v-col class="mx-auto mb-4" max-width="500">
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
    <!-- <div class="inktext" align="center">
      <NuxtLink class="n-link" to="/">Cancel</NuxtLink>
    </div> -->
  </v-sheet>

  <OverlayMsg
    v-if="msgShow"
    :showMsg="msgShow"
    successMsg="Please check your email to update your password."
  >
    <v-btn color="green-lighten-1" variant="flat" block @click="close">
      Close
    </v-btn>
  </OverlayMsg>
</template>

<script setup lang="ts">
import smallicon from "@/assets/images/Svueti.png";

const form = ref(false);
const loading = ref(false);
const email = ref("");
const resetForm = ref();
const msgShow = ref(false);

// Reset Auth
// const successMsg = ref("");
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
      // successMsg.value =
      //   "Successfully reset: Check your email to update password";
      loading.value = false;
      resetForm.value.reset();
      msgShow.value = true;
    }
  } catch (error) {
    console.error(error);
  }
};

const close = (value: any) => {
  if (value) msgShow.value = true;

  return (msgShow.value = false);
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
