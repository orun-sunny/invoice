<template>
  <div class="space-y-6">
    <!-- Header -->
    <div
      class="flex items-center justify-between bg-indigo-100 p-3 rounded-lg mt-8"
    >
      <h2 class="font-semibold text-lg">
        Product List ({{ products.length }})
      </h2>
      <button
        @click="$emit('add-product')"
        class="text-green-500 text-xl hover:bg-indigo-200 rounded-full h-8 w-8 flex items-center justify-center transition-colors"
      >
        +
      </button>
    </div>

    <!-- Empty State -->
    <div
      v-if="products.length === 0"
      class="text-center py-8 bg-gray-50 rounded-lg border border-dashed border-gray-300"
    >
      <div class="text-gray-400 mb-2">No products added yet</div>
      <button
        @click="$emit('add-product')"
        class="text-indigo-600 hover:text-indigo-800 font-medium"
      >
        + Add your first product
      </button>
    </div>

    <!-- Product Cards -->
    <div v-else class="grid grid-cols-1 gap-6">
      <ProductCard
        v-for="(product, index) in products"
        :key="index"
        :product="product"
        :product-index="index"
        :product-list="productList"
        :errors="errors"
        @remove-product="$emit('remove-product', index)"
        @add-adjustment="$emit('add-adjustment', index)"
        @remove-adjustment="
          ( adjustmentIndex: number) =>
            $emit('remove-adjustment', index, adjustmentIndex)
        "
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Product, ValidationError } from '~/types/invoice';
import ProductCard from './ProductCard.vue';



defineProps<{
  products: Product[];
  productList: { id: number; name: string }[];
  errors?: ValidationError[];
}>();

defineEmits<{
  (e: "add-product"): void;
  (e: "remove-product", index: number): void;
  (e: "add-adjustment", index: number): void;
  (e: "remove-adjustment", productIndex: number, adjustmentIndex: number): void;
}>();
</script>
