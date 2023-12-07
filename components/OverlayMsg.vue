<template>
  <v-row class="d-flex justify-center">
    <v-overlay
      v-model="props.showMsg"
      class="d-flex justify-center align-center"
    >
      <v-card class="vdiacard">
        <v-card-text>{{ $props.successMsg }}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <slot />
        </v-card-actions>
      </v-card>
    </v-overlay>
  </v-row>
</template>

<script setup lang="ts">
const props = defineProps({
  showMsg: {
    type: Boolean,
    required: true,
  },
  successMsg: {
    type: String,
    required: true,
  },
});
</script>
