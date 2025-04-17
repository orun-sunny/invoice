<template>
  <div class="bg-gray-50 rounded-lg p-3 border">
    <!-- Empty State -->
    <div
      v-if="adjustments.length === 0"
      class="text-center py-4 text-gray-400 text-sm"
    >
      No adjustments or returns added yet
    </div>

    <!-- Adjustment Items-->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-3">
      <AdjustmentItems
        v-for="(adjustment, i) in adjustments"
        :key="adjustment.id"
        :adjustment="adjustment"
        :product-index="productIndex"
        :adjustment-index="i"
        :errors="errors"
        @remove="$emit('remove-adjustment', i)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Adjustment, ValidationError } from "~/types/invoice";
import AdjustmentItems from "./AdjustmentItems.vue";

defineProps<{
  productIndex: number;
  adjustments: Adjustment[];
  errors?: ValidationError[];
}>();

defineEmits<{
  (e: "remove-adjustment", index: number): void;
}>();
</script>
