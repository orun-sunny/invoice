<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between bg-indigo-100 p-3 rounded-lg">
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
      <div
        v-for="(product, index) in products"
        :key="index"
        class="bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
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
            v-if="products.length > 1"
            @click="$emit('remove-product', index)"
            class="text-red-500 hover:bg-red-50 rounded-full h-8 w-8 flex items-center justify-center transition-colors"
          >
            🗑
          </button>
        </div>

        <!-- Product Details -->
        <div class="p-4">
          <div class="grid grid-cols-1 md:grid-cols-6 gap-4 items-center">
            <div class="col-span-1">
              <label class="block text-sm font-medium text-gray-700 mb-1"
                >Product</label
              >
              <select
                v-model="product.name"
                class="border p-2 rounded w-full focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 transition-colors"
              >
                <option disabled value="">Select</option>
                <option v-for="p in productList" :key="p.id" :value="p.name">
                  {{ p.name }}
                </option>
              </select>
            </div>
            <div class="col-span-1">
              <label class="block text-sm font-medium text-gray-700 mb-1"
                >Type</label
              >
              <select
                v-model="product.type"
                class="border p-2 rounded w-full focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 transition-colors"
              >
                <option disabled value="">Select</option>
                <option>Adjustment</option>
                <option>Return</option>
              </select>
            </div>
            <div class="col-span-1">
              <label class="block text-sm font-medium text-gray-700 mb-1"
                >Quantity</label
              >
              <input
                v-model.number="product.qty"
                type="number"
                placeholder="0"
                class="border p-2 rounded w-full focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 transition-colors"
              />
            </div>
            <div class="col-span-1">
              <label class="block text-sm font-medium text-gray-700 mb-1"
                >Receive Qty</label
              >
              <input
                v-model.number="product.receiveQty"
                type="number"
                placeholder="0"
                class="border p-2 rounded w-full focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 transition-colors"
              />
            </div>
            <div class="col-span-1">
              <label class="block text-sm font-medium text-gray-700 mb-1"
                >Rate</label
              >
              <input
                v-model.number="product.rate"
                type="number"
                placeholder="0.00"
                class="border p-2 rounded w-full focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 transition-colors"
              />
            </div>
            <div class="col-span-1">
              <label class="block text-sm font-medium text-gray-700 mb-1"
                >Total</label
              >
              <input
                :value="calculateTotal(product)"
                type="number"
                disabled
                class="border p-2 rounded w-full bg-gray-50"
              />
            </div>
          </div>

          <!-- Adjustments Section -->
          <div class="mt-6">
            <div class="flex items-center justify-between mb-2">
              <h4 class="font-medium text-gray-700">Adjustments & Returns</h4>
              <span
                class="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
              >
                {{ product.adjustments.length }} items
              </span>
            </div>

            <!-- Adjustments List -->
            <div class="bg-gray-50 rounded-lg p-3 border">
              <!-- Empty State -->
              <div
                v-if="product.adjustments.length === 0"
                class="text-center py-4 text-gray-400 text-sm"
              >
                No adjustments or returns added yet
              </div>

              <!-- Adjustment Items -->
              <div v-else class="space-y-3">
                <div
                  v-for="(adjust, i) in product.adjustments"
                  :key="i"
                  class="grid grid-cols-1 md:grid-cols-5 gap-3 items-center bg-white p-3 rounded border"
                >
                  <div class="col-span-1">
                    <label class="block text-xs text-gray-500 mb-1">Item</label>
                    <input
                      v-model="adjust.item"
                      placeholder="Item name"
                      class="border p-2 rounded w-full text-sm"
                    />
                  </div>
                  <div class="col-span-1">
                    <label class="block text-xs text-gray-500 mb-1">Type</label>
                    <select
                      v-model="adjust.adjustment"
                      class="border p-2 rounded w-full text-sm"
                    >
                      <option>Adjustment</option>
                      <option>Return</option>
                    </select>
                  </div>
                  <div class="col-span-1">
                    <label class="block text-xs text-gray-500 mb-1"
                      >Batch</label
                    >
                    <input
                      v-model="adjust.batch"
                      placeholder="Batch #"
                      class="border p-2 rounded w-full text-sm"
                    />
                  </div>
                  <div class="col-span-1">
                    <label class="block text-xs text-gray-500 mb-1"
                      >Quantity</label
                    >
                    <input
                      v-model.number="adjust.qty"
                      type="number"
                      placeholder="0"
                      class="border p-2 rounded w-full text-sm"
                    />
                  </div>
                  <div class="col-span-1 flex items-end">
                    <button
                      @click="$emit('remove-adjustment', index, i)"
                      class="text-red-500 hover:bg-red-50 rounded p-2 text-sm flex items-center transition-colors"
                    >
                      <span class="mr-1">🗑</span> Remove
                    </button>
                  </div>
                </div>
              </div>

              <!-- Add Adjustment Button -->
              <div class="mt-3">
                <button
                  @click="$emit('add-adjustment', index)"
                  class="text-indigo-600 hover:text-indigo-800 text-sm flex items-center transition-colors"
                >
                  <span class="mr-1">+</span> Add Adjustment or Return
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from "vue";

interface Adjustment {
  item: string;
  adjustment: string;
  batch: string;
  qty: number;
}

interface Product {
  name: string;
  type: string;
  qty: number;
  receiveQty: number;
  rate: number;
  adjustments: Adjustment[];
}

const props = defineProps<{
  products: Product[];
  productList: { id: number; name: string }[];
}>();

defineEmits<{
  (e: "add-product"): void;
  (e: "remove-product", index: number): void;
  (e: "add-adjustment", index: number): void;
  (e: "remove-adjustment", productIndex: number, adjustmentIndex: number): void;
}>();

const calculateTotal = (product: Product) => {
  return product.qty * product.rate;
};
</script>
