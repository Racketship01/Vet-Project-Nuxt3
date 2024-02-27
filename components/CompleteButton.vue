<script setup>
defineProps({
    modelValue: {
    type: Boolean,
    default: false
  },
});
defineEmits(["update:modelValue"]);
</script>
<template>
  <label
    class= "btnComplete"
                    
    :class="{
      'bg-green': modelValue,
      'bg': !modelValue,
    }"
  >
    <input
      type="checkbox"
      :value="modelValue"
      class="hidden"
      @input="() => $emit('update:modelValue', !modelValue)"
    />
    {{ modelValue ? "Completed" : "Complete" }}
  </label>
</template>
<style scoped>
::selection {
  display: none;
}
</style>