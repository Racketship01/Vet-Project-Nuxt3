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
      <div class="img-logC">
        <img class="img-logi" :src="icon" />
      </div>
      <div class="head_title">Sign Up</div>

      <!-- Email -->
      <v-form v-model="form" ref="resetForm" @submit.prevent="signUp">
        <v-text-field
          class="text_field"
          :readonly="loading"
          label="User name"
          color="teal-lighten-3"
          persistent-hint
          variant="outlined"
          v-model="username"
          :rules="userNameRule"
        ></v-text-field>

        <v-text-field
          :readonly="loading"
          v-model="email"
          class="text_field"
          label="Your Email"
          persistent-hint
          variant="outlined"
          color="teal-lighten-3"
          :rules="emailRules"
        ></v-text-field>

        <!-- Password -->
        <v-text-field
          :readonly="loading"
          :rules="passwordSign"
          class="text_field"
          label="Enter Password"
          variant="outlined"
          color="teal-lighten-3"
          v-model="password"
          :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
          :type="visible ? 'text' : 'password'"
          @click:append-inner="visible = !visible"
        ></v-text-field>

        <!-- <span class="success pagh">{{ successMsg }}</span> -->

        <!-- Button -->
        <v-row align="center" justify="center">
          <v-col class="mx-auto" max-width="500">
            <v-btn
              type="submit"
              :disabled="!form"
              :loading="loading"
              block
              size="x-large"
              color="blue-darken-1"
              variant="flat"
            >
              Sign up</v-btn
            >
          </v-col>
        </v-row>
      </v-form>
      <!-- register link -->
      <div class="link_text" align="center">
        <span>Already have an account?</span>
        <NuxtLink class="page_link" to="/">Login Here</NuxtLink>
      </div>
    </div>
  </v-sheet>

  <OverlayMsg
    v-if="msgShow"
    class="overlay_msg"
    :showMsg="msgShow"
    successMsg="Please check your email to confirm your account."
  >
    <v-btn color="green-lighten-1" variant="flat" block @click="close">
      Close
    </v-btn>
  </OverlayMsg>
</template>

<script setup lang="ts">
import icon from "@/assets/images/Svueti.png";

const form = ref(false);
const username = ref("");
const email = ref("");
const password = ref("");
const loading = ref(false);
const visible = ref(false);
const resetForm = ref();
const msgShow = ref(false);

const userNameRule = userRule();
const emailRules = emailRule();
const { passwordSign } = passwordRule();

// SignUp Auth
const supabase = useSupabaseClient();

const signUp = async () => {
  if (!form.value) return;
  loading.value = true;

  try {
    const { data, error } = await supabase.auth.signUp({
      email: email.value,
      password: password.value,
      options: {
        data: {
          full_name: username.value,
        },
        emailRedirectTo: "http://localhost:3000/profile",
      },
    });
    if (error) throw error;

    if (data) {
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
</script>
