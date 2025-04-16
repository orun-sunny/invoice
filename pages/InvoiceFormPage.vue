<template>
  <div class="p-4 bg-white shadow-md rounded space-y-6">
    <!-- Product List Component -->
    <ProductList
      :products="products"
      :productList="productList"
      :errors="validationErrors"
      @add-product="addProduct"
      @remove-product="removeProduct"
      @add-adjustment="addAdjustment"
      @remove-adjustment="removeAdjustment"
      @update-product="updateProduct"
    />

    <!-- Form Errors -->
    <div
      v-if="formErrors.length > 0"
      class="bg-red-50 border border-red-200 text-red-700 p-3 rounded"
    >
      <h4 class="font-medium mb-1">Please correct the following errors:</h4>
      <ul class="list-disc list-inside text-sm">
        <li v-for="(error, index) in formErrors" :key="index">{{ error }}</li>
      </ul>
    </div>

    <!-- Summary Section -->
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
    <div v-if="savedInvoices.length > 0" class="mt-8 border-t pt-6">
      <h3 class="font-semibold text-lg mb-4">Saved Invoices</h3>

      <div class="space-y-4">
        <div
          v-for="(invoice, idx) in savedInvoices"
          :key="idx"
          class="border rounded-lg p-4 bg-gray-50"
        >
          <div class="flex justify-between items-center mb-3">
            <h4 class="font-medium">Invoice #{{ idx + 1 }}</h4>
            <div class="flex space-x-2">
              <button
                @click="loadInvoice(invoice)"
                class="text-indigo-600 hover:text-indigo-800 text-sm"
              >
                Edit
              </button>
              <button
                @click="deleteSavedInvoice(idx)"
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
                {{ formatCurrency(calculateInvoiceTotal(invoice)) }}
              </div>
              <div class="text-sm text-gray-500 mt-2">Adjustments:</div>
              <div>{{ getTotalAdjustments(invoice) }} items</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import ProductList from "~/components/ProductList.vue";

const productList = [
  { id: 1, name: "Item A" },
  { id: 2, name: "Item B" },
  { id: 3, name: "Item C" },
];

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

interface ValidationError {
  productIndex: number;
  field: string;
  message: string;
  adjustmentIndex?: number;
}

const products = ref<Product[]>([
  {
    name: "",
    type: "",
    qty: 0,
    receiveQty: 0,
    rate: 0,
    adjustments: [],
  },
]);

// Store saved invoices
const savedInvoices = ref<Product[][]>([]);

// Validation errors
const validationErrors = ref<ValidationError[]>([]);
const formErrors = ref<string[]>([]);

const addProduct = () => {
  products.value.push({
    name: "",
    type: "",
    qty: 0,
    receiveQty: 0,
    rate: 0,
    adjustments: [],
  });
};

const removeProduct = (productIndex: number) => {
  products.value.splice(productIndex, 1);
  // Clear any validation errors for this product
  validationErrors.value = validationErrors.value.filter(
    (error) => error.productIndex !== productIndex
  );
};

const updateProduct = (productIndex: number, field: string, value: any) => {
  // This function would be used if you want to handle product updates in the parent component
  // For now, we're using v-model directly in the ProductList component
};

const addAdjustment = (productIndex: number) => {
  products.value[productIndex].adjustments.push({
    item: "",
    adjustment: "Adjustment",
    batch: "",
    qty: 0,
  });
};

const removeAdjustment = (productIndex: number, adjIndex: number) => {
  products.value[productIndex].adjustments.splice(adjIndex, 1);
  // Clear any validation errors for this adjustment
  validationErrors.value = validationErrors.value.filter(
    (error) =>
      !(
        error.productIndex === productIndex &&
        error.adjustmentIndex === adjIndex
      )
  );
};

const calculateTotal = (product: Product) => {
  return product.qty * product.rate;
};

const calculateGrandTotal = () => {
  return products.value.reduce((total, product) => {
    return total + calculateTotal(product);
  }, 0);
};

const calculateInvoiceTotal = (invoice: Product[]) => {
  return invoice.reduce((total, product) => {
    return total + product.qty * product.rate;
  }, 0);
};

const getTotalAdjustments = (invoice: Product[]) => {
  return invoice.reduce((total, product) => {
    return total + product.adjustments.length;
  }, 0);
};

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
};

const resetForm = () => {
  products.value = [
    {
      name: "",
      type: "",
      qty: 0,
      receiveQty: 0,
      rate: 0,
      adjustments: [],
    },
  ];
  // Clear validation errors
  validationErrors.value = [];
  formErrors.value = [];
};

const validateForm = () => {
  validationErrors.value = [];
  formErrors.value = [];
  let isValid = true;

  // Check if there are any products
  if (products.value.length === 0) {
    formErrors.value.push("Please add at least one product");
    isValid = false;
  }

  // Validate each product
  products.value.forEach((product, index) => {
    // Check required fields
    if (!product.name) {
      validationErrors.value.push({
        productIndex: index,
        field: "name",
        message: "Product name is required",
      });
      formErrors.value.push(`Product #${index + 1}: Name is required`);
      isValid = false;
    }

    if (!product.type) {
      validationErrors.value.push({
        productIndex: index,
        field: "type",
        message: "Product type is required",
      });
      formErrors.value.push(`Product #${index + 1}: Type is required`);
      isValid = false;
    }

    if (product.qty <= 0) {
      validationErrors.value.push({
        productIndex: index,
        field: "qty",
        message: "Quantity must be greater than 0",
      });
      formErrors.value.push(
        `Product #${index + 1}: Quantity must be greater than 0`
      );
      isValid = false;
    }

    if (product.rate <= 0) {
      validationErrors.value.push({
        productIndex: index,
        field: "rate",
        message: "Rate must be greater than 0",
      });
      formErrors.value.push(
        `Product #${index + 1}: Rate must be greater than 0`
      );
      isValid = false;
    }

    // Validate adjustments if any
    product.adjustments.forEach((adjustment, adjIndex) => {
      if (!adjustment.item) {
        validationErrors.value.push({
          productIndex: index,
          adjustmentIndex: adjIndex,
          field: "item",
          message: "Item name is required",
        });
        formErrors.value.push(
          `Product #${index + 1}, Adjustment #${
            adjIndex + 1
          }: Item name is required`
        );
        isValid = false;
      }

      if (adjustment.qty <= 0) {
        validationErrors.value.push({
          productIndex: index,
          adjustmentIndex: adjIndex,
          field: "qty",
          message: "Quantity must be greater than 0",
        });
        formErrors.value.push(
          `Product #${index + 1}, Adjustment #${
            adjIndex + 1
          }: Quantity must be greater than 0`
        );
        isValid = false;
      }
    });
  });

  return isValid;
};

const validateAndSave = () => {
  if (validateForm()) {
    saveInvoice();
  }
};

const saveInvoice = () => {
  // Create a deep copy of the products array to avoid reference issues
  const invoiceCopy = JSON.parse(JSON.stringify(products.value));

  // Add to saved invoices
  savedInvoices.value.push(invoiceCopy);

  console.log("Saving invoice:", JSON.stringify(products.value));
  alert("Invoice saved successfully!");

  // Reset the form for a new invoice
  resetForm();
};

const loadInvoice = (invoice: Product[]) => {
  // Create a deep copy to avoid reference issues
  products.value = JSON.parse(JSON.stringify(invoice));
  // Clear validation errors when loading an invoice
  validationErrors.value = [];
  formErrors.value = [];
};

const deleteSavedInvoice = (index: number) => {
  if (confirm("Are you sure you want to delete this invoice?")) {
    savedInvoices.value.splice(index, 1);
  }
};
</script>
