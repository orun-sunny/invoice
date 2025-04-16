<template>
    <div class="border rounded-lg p-4 shadow-md bg-white">
      <h2 class="text-xl font-semibold mb-2">{{ product.name }}</h2>
      <p class="text-gray-600 mb-1">Price: ${{ product.price }}</p>
      <p class="text-gray-600">Description: {{ product.description }}</p>
    </div>
  </template>
  
  <script setup lang="ts">
  defineProps<{
    product: {
      name: string
      price: number
      description: string
    }
  }>()
  </script>
  