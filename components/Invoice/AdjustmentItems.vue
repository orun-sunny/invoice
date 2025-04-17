<template>
  <div
    class="grid grid-cols-2 md:grid-cols-6 gap-3 items-center bg-gray-200 p-3 rounded border"
    :class="{
      'border-red-300': hasAdjustmentError(productIndex, adjustmentIndex),
    }"
  >
    <div class="col-span-1">
      <label class="block text-xs text-gray-500 mb-1">
        Item <span class="text-red-500">*</span>
      </label>
      <input
        v-model="adjustment.item"
        placeholder="Item name"
        class="border p-2 rounded w-full text-sm"
        :class="{
          'border-red-500': getAdjustmentFieldError(
            productIndex,
            adjustmentIndex,
            'item'
          ),
        }"
      />
      <div
        v-if="getAdjustmentFieldError(productIndex, adjustmentIndex, 'item')"
        class="text-red-500 text-xs mt-1"
      >
        {{ getAdjustmentFieldError(productIndex, adjustmentIndex, "item") }}
      </div>
    </div>

    <div class="col-span-1">
      <label class="block text-xs text-gray-500 mb-1">Type</label>
      <select
        v-model="adjustment.adjustment"
        class="border p-2 rounded w-full text-sm"
      >
        <option>Adjustment</option>
        <option>Return</option>
      </select>
    </div>

    <div class="col-span-1">
      <label class="block text-xs text-gray-500 mb-1">Batch</label>
      <input
        v-model="adjustment.batch"
        placeholder="Batch #"
        class="border p-2 rounded w-full text-sm"
      />
    </div>

    <div class="col-span-1">
      <label class="block text-xs text-gray-500 mb-1">
        Quantity <span class="text-red-500">*</span>
      </label>
      <input
        v-model.number="adjustment.qty"
        type="number"
        placeholder="0"
        class="border p-2 rounded w-full text-sm"
        :class="{
          'border-red-500': getAdjustmentFieldError(
            productIndex,
            adjustmentIndex,
            'qty'
          ),
        }"
      />
      <div
        v-if="getAdjustmentFieldError(productIndex, adjustmentIndex, 'qty')"
        class="text-red-500 text-xs mt-1"
      >
        {{ getAdjustmentFieldError(productIndex, adjustmentIndex, "qty") }}
      </div>
    </div>

    <div class="col-span-1 flex items-end">
      <button
        @click="$emit('remove')"
        class="text-red-500 hover:bg-red-50 rounded p-2 text-sm flex items-center transition-colors"
      >
        <span class="mr-1">🗑</span> Remove
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Adjustment, ValidationError } from '~/types/invoice';



const props = defineProps<{
  adjustment: Adjustment;
  productIndex: number;
  adjustmentIndex: number;
  errors?: ValidationError[];
}>();

defineEmits<{
  (e: "remove"): void;
}>();

const hasAdjustmentError = (productIndex: number, adjustmentIndex: number) => {
  if (!props.errors) return false;
  return props.errors.some(
    (error) =>
      error.productIndex === productIndex &&
      error.adjustmentIndex === adjustmentIndex
  );
};

const getAdjustmentFieldError = (
  productIndex: number,
  adjustmentIndex: number,
  field: string
) => {
  if (!props.errors) return null;
  const error = props.errors.find(
    (e) =>
      e.productIndex === productIndex &&
      e.adjustmentIndex === adjustmentIndex &&
      e.field === field
  );
  return error ? error.message : null;
};
</script>
