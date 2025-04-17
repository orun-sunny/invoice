<template>
    <div class="mt-8 border-t pt-6">
      <h3 class="font-semibold text-lg mb-4">Saved Invoices</h3>
  
      <div class="space-y-4">
        <div
          v-for="(invoice, idx) in invoices"
          :key="idx"
          class="border rounded-lg p-4 bg-gray-50"
        >
          <div class="flex justify-between items-center mb-3">
            <h4 class="font-medium">Invoice #{{ idx + 1 }}</h4>
            <div class="flex space-x-2">
              <button
                @click="$emit('load', invoice)"
                class="text-indigo-600 hover:text-indigo-800 text-sm"
              >
                Edit
              </button>
              <button
                @click="$emit('delete', idx)"
                class="text-red-500 hover:text-red-700 text-sm"
              >
                Delete
              </button>
            </div>
          </div>
  
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div class="text-sm text-gray-500">Products:</div>
              <ul class="list-disc list-inside">
                <li v-for="(product, i) in invoice" :key="i" class="text-sm">
                  {{ product.name || "Unnamed product" }}
                  ({{ product.qty }} × {{ formatCurrency(product.rate) }})
                </li>
              </ul>
            </div>
            <div>
              <div class="text-sm text-gray-500">Total:</div>
              <div class="font-semibold">
                {{ formatCurrency(calculateTotal(invoice)) }}
              </div>
              <div class="text-sm text-gray-500 mt-2">Adjustments:</div>
              <div>{{ getTotalAdjustments(invoice) }} items</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
import type { Product } from '~/types/invoice';
import { formatCurrency } from '~/Utils/format';


  
  defineProps<{
    invoices: Product[][]
    calculateTotal: (invoice: Product[]) => number
    getTotalAdjustments: (invoice: Product[]) => number
  }>()
  
  defineEmits<{
    (e: 'load', invoice: Product[]): void
    (e: 'delete', index: number): void
  }>()
  </script>