<template>
  <v-sheet
    elevation="12"
    max-width="600"
    rounded="lg"
    class="pa-4 mx-auto ma-15"
  >
    <div>
      <div>
        <img :src="logo" class="vimglog" />
      </div>

      <h1 class="logh1">Sign Up</h1>

      <!-- Email -->
      <v-form v-model="form" ref="resetForm" @submit.prevent="signUp">
        <v-text-field
          :readonly="loading"
          label="Enter Full Name"
          persistent-hint
          variant="outlined"
          v-model="username"
          :rules="userNameRule"
        ></v-text-field>

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
          :rules="passwordSign"
          :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
          :type="visible ? 'text' : 'password'"
          @click:append-inner="visible = !visible"
        ></v-text-field>

        <!-- <span class="success pagh">{{ successMsg }}</span> -->

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
              Sign up</v-btn
            >
          </v-col>
        </v-row>
      </v-form>
      <!-- register link -->
      <div class="inktext" align="center">
        <span>Already have an account?</span>
        <NuxtLink class="n-link" to="/">Login Here</NuxtLink>
      </div>
    </div>
  </v-sheet>

  <OverlayMsg
    v-if="msgShow"
    :showMsg="msgShow"
    successMsg="Please check your email to confirm your account."
  >
    <v-btn color="green-lighten-1" variant="flat" block @click="close">
      Close
    </v-btn>
  </OverlayMsg>
</template>

<script setup lang="ts">
import logo from "@/assets/images/vueh.png";

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
