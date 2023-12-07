<template>
  <v-row justify="center">
    <v-dialog :v-model="props.dialog" persistent width="auto">
      <v-card class="vdiacard">
        <v-card-text
          >Please check your email to confirm your account.</v-card-text
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green-lighten-1"
            variant="flat"
            block
            @click="$emit('close')"
          >
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script setup lang="ts">
const props = defineProps({
  dialog: {
    type: Boolean,
    required: true,
  },
  successMsg: {
    type: String,
    required: true,
  },
});

const previousOverflow = ref("");
onMounted(() => {
  // Lock the scrollbar by removing overflow if we have any
  previousOverflow.value = document.body.style.overflow;
  // eslint-disable-next-line quotes
  document.body.style.overflow = "hidden";
});
onBeforeUnmount(() => {
  // Restore the overflow and position
  document.body.style.overflow = previousOverflow.value;
});

// const dialogRules = (value: any) => {
//   if (value) {
//     return !props.dialog;
//   }
//   return props.dialog;
// };
</script>
