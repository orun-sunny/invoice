<template>
  <div
    class="bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
    :class="{ 'border-red-300': hasProductError(productIndex) }"
  >
    <!-- Card Header -->
    <div class="bg-gray-50 p-3 border-b flex justify-between items-center">
      <h3 class="font-medium">
        {{ product.name || "Select a product" }}
        <span v-if="product.name" class="ml-2 text-sm text-gray-500">
          ({{ product.type || "No type selected" }})
        </span>
      </h3>
      <button
        @click="$emit('remove-product')"
        class="text-red-500 hover:bg-red-50 rounded-full h-8 w-8 flex items-center justify-center transition-colors"
      >
        🗑
      </button>
    </div>

    <!-- Product Details -->
    <div class="p-4">
      <ProductDetails
        :product="product"
        :product-index="productIndex"
        :product-list="productList"
        :errors="errors"
      />

      <!-- Adjustments Section -->
      <div class="mt-6">
        <div class="flex items-center justify-between mb-2">
          <h4 class="font-medium text-gray-700">Adjustments & Returns</h4>
          <div class="flex items-center gap-2">
            <span
              class="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
            >
              {{ product.adjustments.length }} items
            </span>
            <button
              @click="$emit('add-adjustment')"
              class="ml-2 text-indigo-600 hover:text-indigo-800 text-sm flex items-center transition-colors"
            >
              <span class="mr-1 text-xl">+</span> Add Adjustment or Return
            </button>
          </div>
        </div>

        <AdjustmentList
          :product-index="productIndex"
          :adjustments="product.adjustments"
          :errors="errors"
          @remove-adjustment="$emit('remove-adjustment', $event)"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Product, ValidationError } from '~/types/invoice';
import AdjustmentList from './Invoice/AdjustmentList.vue';




const props = defineProps<{
  product: Product;
  productIndex: number;
  productList: { id: number; name: string }[];
  errors?: ValidationError[];
}>();

defineEmits<{
  (e: "remove-product"): void;
  (e: "add-adjustment"): void;
  (e: "remove-adjustment", adjustmentIndex: number): void;
}>();

const hasProductError = (productIndex: number) => {
  if (!props.errors) return false;
  return props.errors.some((error) => error.productIndex === productIndex);
};
</script>
