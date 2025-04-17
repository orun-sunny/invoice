<template>
    <div class="grid grid-cols-1 md:grid-cols-6 gap-4 items-center">
      <div class="col-span-1">
        <label class="block text-sm font-medium text-gray-700 mb-1">
          Product <span class="text-red-500">*</span>
        </label>
        <select
          v-model="product.name"
          class="border p-2 rounded w-full focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 transition-colors"
          :class="{ 'border-red-500': getFieldError(productIndex, 'name') }"
        >
          <option disabled value="">Select</option>
          <option v-for="p in productList" :key="p.id" :value="p.name">
            {{ p.name }}
          </option>
        </select>
        <div
          v-if="getFieldError(productIndex, 'name')"
          class="text-red-500 text-xs mt-1"
        >
          {{ getFieldError(productIndex, "name") }}
        </div>
      </div>
      <div class="col-span-1">
        <label class="block text-sm font-medium text-gray-700 mb-1">
          Type <span class="text-red-500">*</span>
        </label>
        <select
          v-model="product.type"
          class="border p-2 rounded w-full focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 transition-colors"
          :class="{ 'border-red-500': getFieldError(productIndex, 'type') }"
        >
          <option disabled value="">Select</option>
          <option>Adjustment</option>
          <option>Return</option>
        </select>
        <div
          v-if="getFieldError(productIndex, 'type')"
          class="text-red-500 text-xs mt-1"
        >
          {{ getFieldError(productIndex, "type") }}
        </div>
      </div>
      <div class="col-span-1">
        <label class="block text-sm font-medium text-gray-700 mb-1">
          Quantity <span class="text-red-500">*</span>
        </label>
        <input
          v-model.number="product.qty"
          type="number"
          placeholder="0"
          class="border p-2 rounded w-full focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 transition-colors"
          :class="{ 'border-red-500': getFieldError(productIndex, 'qty') }"
        />
        <div
          v-if="getFieldError(productIndex, 'qty')"
          class="text-red-500 text-xs mt-1"
        >
          {{ getFieldError(productIndex, "qty") }}
        </div>
      </div>
      <div class="col-span-1">
        <label class="block text-sm font-medium text-gray-700 mb-1">Receive Qty</label>
        <input
          v-model.number="product.receiveQty"
          type="number"
          placeholder="0"
          class="border p-2 rounded w-full focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 transition-colors"
        />
      </div>
      <div class="col-span-1">
        <label class="block text-sm font-medium text-gray-700 mb-1">
          Rate <span class="text-red-500">*</span>
        </label>
        <input
          v-model.number="product.rate"
          type="number"
          placeholder="0.00"
          class="border p-2 rounded w-full focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 transition-colors"
          :class="{ 'border-red-500': getFieldError(productIndex, 'rate') }"
        />
        <div
          v-if="getFieldError(productIndex, 'rate')"
          class="text-red-500 text-xs mt-1"
        >
          {{ getFieldError(productIndex, "rate") }}
        </div>
      </div>
      <div class="col-span-1">
        <label class="block text-sm font-medium text-gray-700 mb-1">Total</label>
        <input
          :value="calculateTotal(product)"
          type="number"
          disabled
          class="border p-2 rounded w-full bg-gray-50"
        />
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
import type { Product, ValidationError } from '~/types/invoice';


  
  const props = defineProps<{
    product: Product
    productIndex: number
    productList: { id: number; name: string }[]
    errors?: ValidationError[]
  }>()
  
  const calculateTotal = (product: Product) => {
    return product.qty * product.rate
  }
  
  const getFieldError = (productIndex: number, field: string) => {
    if (!props.errors) return null
    const error = props.errors.find(
      (e) => e.productIndex === productIndex && e.field === field && e.adjustmentIndex === undefined
    )
    return error ? error.message : null
  }
  </script>