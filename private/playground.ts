setTimeout(() => (this.loading = false), 2000);

<template>
  <v-card class="ml-px-6 py-8" max-width="344">
    <v-form v-model="form" @submit.prevent="onSubmit">
      <v-text-field
        v-model="email"
        :readonly="loading"
        :rules="[required]"
        class="mb-2"
        clearable
        label="Email"
      ></v-text-field>

      <v-text-field
        v-model="password"
        :readonly="loading"
        :rules="[required]"
        clearable
        label="Password"
        placeholder="Enter your password"
      ></v-text-field>

      <br />

      <NuxtLink to="/profile">
        <v-btn
          :disabled="!form"
          :loading="loading"
          block
          color="success"
          size="large"
          type="submit"
          variant="elevated"
          @click="loading = !loading"
          >Sign In
        </v-btn>
      </NuxtLink>

      <NuxtLink to="/signUp">SignUp Here</NuxtLink>
    </v-form>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    form: false,
    email: null,
    password: null,
    loading: false,
  }),

  methods: {
    onSubmit() {
      if (!this.form) return;

      this.loading = true;

      setTimeout(() => (this.loading = false), 2000);
    },
    required(v) {
      return !!v || "Field is required";
    },
  },
};
</script>
