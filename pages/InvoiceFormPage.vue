<template>
  <div class="p-4 bg-white shadow-md rounded space-y-6">
    <!-- Product List Component -->
    <ProductList
      :products="invoiceState.products"
      :product-list="productList"
      :errors="invoiceState.validationErrors"
      @add-product="addProduct"
      @remove-product="removeProduct"
      @add-adjustment="addAdjustment"
      @remove-adjustment="removeAdjustment"
    />

    <FormErrors :errors="invoiceState.formErrors" />

    <!-- Summary Section -->
    <InvoiceSummary
      :products="invoiceState.products"
      :calculate-total="calculateTotal"
    />

    <!-- Action Buttons -->
    <div class="flex justify-end space-x-2 mt-4">
      <button
        @click="resetForm"
        class="px-4 py-2 border rounded bg-gray-100 hover:bg-gray-200 transition-colors"
      >
        Reset
      </button>
      <button
        @click="validateAndSave"
        class="px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
      >
        Save Invoice
      </button>
    </div>

    <!-- Saved Invoices Section -->
    <SavedInvoice
      v-if="invoiceState.savedInvoices.length > 0"
      :invoices="invoiceState.savedInvoices"
      :calculate-total="calculateInvoiceTotal"
      :get-total-adjustments="getTotalAdjustments"
      @load="loadInvoice"
      @delete="deleteSavedInvoice"
    />
  </div>
</template>

<script setup lang="ts">
import InvoiceSummary from "~/components/Invoice/InvoiceSummary.vue";
import SavedInvoice from "~/components/Invoice/SavedInvoice.vue";
import ProductList from "~/components/ProductList.vue";
import { productList } from "~/data/products";
import type { Product} from "~/types/invoice";

const {
  invoiceState,
  addProduct,
  removeProduct,
  addAdjustment,
  removeAdjustment,
  calculateTotal,
  calculateInvoiceTotal,
  getTotalAdjustments,
  resetForm,
  validateAndSave,
  loadInvoice,
  deleteSavedInvoice,
} = useInvoice();





</script>
