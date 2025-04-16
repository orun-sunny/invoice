<template>
  <div>
    <NavBar />
    <NuxtPage />
    <Footer />
  </div>
</template>
<script setup lang="ts">
import Footer from "~/components/default-layout/Footer.vue";
import NavBar from "~/components/default-layout/nav-bar.vue";

useHead({
  titleTemplate: "Best Tyro",
  templateParams: {
    separator: "|",
    siteName: "Tyro",
  },
});
</script>
