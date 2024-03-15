<template>
  <Login />
</template>

<script setup lang="ts">
definePageMeta({
  key: (route: any) => route.fullPath,
});
</script>
