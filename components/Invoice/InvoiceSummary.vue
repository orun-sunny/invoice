<template>
  <div class="mt-6 border-t pt-4">
    <div class="flex justify-between items-center">
      <h3 class="font-semibold">Invoice Summary</h3>
      <div class="text-right">
        <div class="text-sm text-gray-600">
          Total Items: {{ products.length }}
        </div>
        <div class="text-lg font-bold">
          Total: {{ formatCurrency(calculateGrandTotal()) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Product } from "~/types/invoice";
import { formatCurrency } from "~/Utils/format";

const props = defineProps<{
  products: Product[];
  calculateTotal: (product: Product) => number;
}>();

const calculateGrandTotal = () => {
  return props.products.reduce((total, product) => {
    return total + props.calculateTotal(product);
  }, 0);
};
</script>
