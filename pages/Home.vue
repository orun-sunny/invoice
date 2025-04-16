<template>
    <div class="min-h-screen bg-gray-50 p-4">
      <div class="max-w-6xl mx-auto bg-white rounded-lg shadow">
        <!-- Header -->
        <div class="flex items-center justify-between p-4 border-b">
          <h1 class="text-lg font-medium text-blue-600">Product - Stock (E: {{ totalExisting }}, P: {{ totalPending }})</h1>
          <button class="text-sm text-gray-500 hover:text-gray-700">
            <XIcon class="w-5 h-5" />
          </button>
        </div>
  
        <!-- Main Form -->
        <div class="p-4">
          <div class="grid grid-cols-12 gap-3 mb-4 items-center">
            <div class="col-span-3">
              <div class="relative">
                <select v-model="mainForm.product" class="w-full border border-gray-300 rounded px-3 py-2 appearance-none focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent">
                  <option value="" disabled>Product</option>
                  <option v-for="product in products" :key="product.id" :value="product.id">{{ product.name }}</option>
                </select>
                <div class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <ChevronDownIcon class="w-4 h-4 text-gray-500" />
                </div>
              </div>
            </div>
            
            <div class="col-span-2">
              <div class="relative">
                <select v-model="mainForm.type" class="w-full border border-gray-300 rounded px-3 py-2 appearance-none focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent">
                  <option value="" disabled>Type</option>
                  <option value="purchase">Purchase</option>
                  <option value="transfer">Transfer</option>
                  <option value="return">Return</option>
                </select>
                <div class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <ChevronDownIcon class="w-4 h-4 text-gray-500" />
                </div>
              </div>
            </div>
            
            <div class="col-span-2">
              <input 
                type="number" 
                v-model="mainForm.quantity" 
                placeholder="Quantity" 
                class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            
            <div class="col-span-2">
              <input 
                type="number" 
                v-model="mainForm.receiveQty" 
                placeholder="Receive Qty" 
                class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            
            <div class="col-span-2">
              <input 
                type="number" 
                v-model="mainForm.rate" 
                placeholder="Rate" 
                class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                @input="calculateTotal"
              />
            </div>
            
            <div class="col-span-1">
              <div class="w-full border border-gray-300 rounded px-3 py-2 bg-gray-50">
                {{ formatCurrency(mainForm.total) }}
              </div>
            </div>
            
            <div class="col-span-1 flex justify-center">
              <button 
                @click="addItem" 
       
              >
                <PlusIcon class="w-5 h-5" />
              </button>
            </div>
          </div>
          
          <!-- Item Rows -->
          <div class="space-y-3">
            <div v-for="(row, rowIndex) in itemRows" :key="rowIndex" class="grid grid-cols-12 gap-3 items-center">
              <div class="col-span-3">
                <div class="relative">
                  <select v-model="row.item" class="w-full border border-gray-300 rounded px-3 py-2 appearance-none focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent">
                    <option value="" disabled>Item</option>
                    <option v-for="item in items" :key="item.id" :value="item.id">{{ item.name }}</option>
                  </select>
                  <div class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <ChevronDownIcon class="w-4 h-4 text-gray-500" />
                  </div>
                </div>
              </div>
              
              <div class="col-span-2">
                <div class="relative">
                  <select v-model="row.adjustment" class="w-full border border-gray-300 rounded px-3 py-2 appearance-none focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent">
                    <option value="" disabled>Adjustment</option>
                    <option value="none">None</option>
                    <option value="discount">Discount</option>
                    <option value="damage">Damage</option>
                  </select>
                  <div class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <ChevronDownIcon class="w-4 h-4 text-gray-500" />
                  </div>
                </div>
              </div>
              
              <div class="col-span-2">
                <div class="relative">
                  <select v-model="row.return" class="w-full border border-gray-300 rounded px-3 py-2 appearance-none focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent">
                    <option value="" disabled>Return</option>
                    <option value="no">No</option>
                    <option value="yes">Yes</option>
                  </select>
                  <div class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <ChevronDownIcon class="w-4 h-4 text-gray-500" />
                  </div>
                </div>
              </div>
              
              <div class="col-span-2">
                <input 
                  type="text" 
                  v-model="row.batch" 
                  placeholder="Batch" 
                  class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              
              <div class="col-span-2">
                <input 
                  type="number" 
                  v-model="row.qty" 
                  placeholder="Qty" 
                  class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              
              <div class="col-span-1 flex justify-center">
                <button 
                  @click="removeItem(rowIndex)" 
                  class="w-8 h-8 rounded-full bg-red-100 text-red-500 flex items-center justify-center hover:bg-red-200 transition-colors"
                >
                  <TrashIcon class="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
          
          <!-- Add more rows button -->
          <div class="mt-4 flex justify-center">
            <button 
              @click="addItemRow" 
              class="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors flex items-center"
            >
              <PlusIcon class="w-4 h-4 mr-1" />
              Add Item Row
            </button>
          </div>
          
          <!-- Form Actions -->
          <div class="mt-6 flex justify-end space-x-3">
            <button class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors">
              Cancel
            </button>
            <button class="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, reactive, computed } from 'vue'
  import { PlusIcon, XIcon, ChevronDownIcon, TrashIcon } from 'lucide-vue-next'
  
  // Sample data (in a real app, this would come from an API)
  const products = [
    { id: 1, name: 'Laptop' },
    { id: 2, name: 'Smartphone' },
    { id: 3, name: 'Tablet' },
    { id: 4, name: 'Monitor' }
  ]
  
  const items = [
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' },
    { id: 3, name: 'Item 3' },
    { id: 4, name: 'Item 4' }
  ]
  
  // Main form state
  const mainForm = reactive({
    product: '',
    type: '',
    quantity: null,
    receiveQty: null,
    rate: null,
    total: 0
  })
  
  // Item rows
  const itemRows = ref([
    {
      item: '',
      adjustment: '',
      return: '',
      batch: '',
      qty: null
    },
    {
      item: '',
      adjustment: '',
      return: '',
      batch: '',
      qty: null
    }
  ])
  
  // Calculate total
  function calculateTotal() {
    if (mainForm.quantity && mainForm.rate) {
      mainForm.total = mainForm.quantity * mainForm.rate
    } else {
      mainForm.total = 0
    }
  }
  
  // Add a new item row
  function addItemRow() {
    itemRows.value.push({
      item: '',
      adjustment: '',
      return: '',
      batch: '',
      qty: null
    })
  }
  
  // Remove an item row
  function removeItem(index) {
    itemRows.value.splice(index, 1)
  }
  
  // Add a new main item
  function addItem() {
    // In a real app, you would add the item to a list of items
    // For this example, we'll just reset the form
    mainForm.product = ''
    mainForm.type = ''
    mainForm.quantity = null
    mainForm.receiveQty = null
    mainForm.rate = null
    mainForm.total = 0
    
    // And add two new item rows
    addItemRow()
    addItemRow()
  }
  
  // Format currency
  function formatCurrency(value) {
    if (!value) return '0.00'
    return value.toFixed(2)
  }
  
  // Computed properties for the header
  const totalExisting = computed(() => 0) // This would be calculated based on your data
  const totalPending = computed(() => 0) // This would be calculated based on your data
  </script>
  
  <style>
  /* Add any custom styles here */
  </style>