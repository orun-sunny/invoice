<template>
  <div>
    <NuxtPage />
    <Footer />
  </div>
</template>
<script setup lang="ts">
import Footer from "~/components/default-layout/Footer.vue";

useHead({
  titleTemplate: "Best Tyro",
  templateParams: {
    separator: "|",
    siteName: "Tyro",
  },
});
</script>
