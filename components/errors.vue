<template>
  <div
    v-if="errors.length > 0"
    class="bg-red-50 border border-red-200 text-red-700 p-3 rounded"
  >
    <h4 class="font-medium mb-1">Please correct the following errors:</h4>
    <ul class="list-disc list-inside text-sm">
      <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
    </ul>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  errors: string[];
}>();
</script>
