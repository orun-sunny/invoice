<!-- <template>
  <div class="p-4">
    <h1 class="text-3xl font-bold mb-4">Welcome to Tyro</h1>

    <InvoiceFormPage />
  </div>
</template>

<script setup lang="ts">
import InvoiceFormPage from "./InvoiceFormPage.vue";

useHead({
  title: "Most profitable way to start with Tyro",
});
</script> -->

<template>
  <div class="p-6 space-y-6">
    <InvoiceFormPage />
  </div>
</template>

<script setup lang="ts">

import InvoiceFormPage from "./InvoiceFormPage.vue";



const selectedProduct = ref();
</script>
