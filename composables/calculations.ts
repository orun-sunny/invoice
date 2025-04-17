import { ref, watch, onMounted } from 'vue'
import type { Product, ValidationError, InvoiceState } from '~/types/invoice'

export function useInvoice() {
    const defaultProduct = {
        name: '',
        type: '',
        qty: 0,
        receiveQty: 0,
        rate: 0,
        adjustments: [
            {
                item: '',
                adjustment: 'Adjustment',
                batch: '',
                qty: 0,
            },
        ],
    }

    const invoiceState = ref<InvoiceState>({
        products: [{ ...defaultProduct }],
        savedInvoices: [],
        validationErrors: [],
        formErrors: [],
    })

    // Load saved invoices 
    onMounted(() => {
        const savedData = localStorage.getItem('savedInvoices')
        if (savedData) {
            try {
                invoiceState.value.savedInvoices = JSON.parse(savedData)
            } catch (e) {
                console.error('Error loading saved invoices:', e)
            }
        }
    })

    // Save in local storage 
    watch(
        () => invoiceState.value.savedInvoices,
        (newValue) => {
            localStorage.setItem('savedInvoices', JSON.stringify(newValue))
        },
        { deep: true }
    )

    const addProduct = () => {
        invoiceState.value.products.push({ ...defaultProduct })
    }

    const removeProduct = (productIndex: number) => {
        invoiceState.value.products.splice(productIndex, 1)
    
        invoiceState.value.validationErrors = invoiceState.value.validationErrors.filter(
            (error) => error.productIndex !== productIndex
        )
    }




    const addAdjustment = (productIndex: number) => {
        invoiceState.value.products[productIndex].adjustments.push({
            item: '',
            adjustment: 'Adjustment',
            batch: '',
            qty: 0,
        })
    }

    const removeAdjustment = (productIndex: number, adjIndex: number) => {
        invoiceState.value.products[productIndex].adjustments.splice(adjIndex, 1)
   
        invoiceState.value.validationErrors = invoiceState.value.validationErrors.filter(
            (error) => !(error.productIndex === productIndex && error.adjustmentIndex === adjIndex)
        )
    }

    const calculateTotal = (product: Product) => {
        return product.qty * product.rate
    }

    const calculateInvoiceTotal = (invoice: Product[]) => {
        return invoice.reduce((total, product) => {
            return total + product.qty * product.rate
        }, 0)
    }

    const getTotalAdjustments = (invoice: Product[]) => {
        return invoice.reduce((total, product) => {
            return total + product.adjustments.length
        }, 0)
    }

    const resetForm = () => {
        invoiceState.value.products = [{ ...defaultProduct }]
        // Clear validation
        invoiceState.value.validationErrors = []
        invoiceState.value.formErrors = []
    }

    const validateForm = () => {
        invoiceState.value.validationErrors = []
        invoiceState.value.formErrors = []
        let isValid = true

        // if there are any products
        if (invoiceState.value.products.length === 0) {
            invoiceState.value.formErrors.push('Please add at least one product')
            isValid = false
        }


        invoiceState.value.products.forEach((product, index) => {
            // required
            if (!product.name) {
                invoiceState.value.validationErrors.push({
                    productIndex: index,
                    field: 'name',
                    message: 'Product name is required',
                })
                invoiceState.value.formErrors.push(`Product #${index + 1}: Name is required`)
                isValid = false
            }

            if (!product.type) {
                invoiceState.value.validationErrors.push({
                    productIndex: index,
                    field: 'type',
                    message: 'Product type is required',
                })
                invoiceState.value.formErrors.push(`Product #${index + 1}: Type is required`)
                isValid = false
            }

            if (product.qty <= 0) {
                invoiceState.value.validationErrors.push({
                    productIndex: index,
                    field: 'qty',
                    message: 'Quantity must be greater than 0',
                })
                invoiceState.value.formErrors.push(`Product #${index + 1}: Quantity must be greater than 0`)
                isValid = false
            }

            if (product.rate <= 0) {
                invoiceState.value.validationErrors.push({
                    productIndex: index,
                    field: 'rate',
                    message: 'Rate must be greater than 0',
                })
                invoiceState.value.formErrors.push(`Product #${index + 1}: Rate must be greater than 0`)
                isValid = false
            }

            // Validate adjustments if any
            product.adjustments.forEach((adjustment, adjIndex) => {
                if (!adjustment.item) {
                    invoiceState.value.validationErrors.push({
                        productIndex: index,
                        adjustmentIndex: adjIndex,
                        field: 'item',
                        message: 'Item name is required',
                    })
                    invoiceState.value.formErrors.push(
                        `Product #${index + 1}, Adjustment #${adjIndex + 1}: Item name is required`
                    )
                    isValid = false
                }

                if (adjustment.qty <= 0) {
                    invoiceState.value.validationErrors.push({
                        productIndex: index,
                        adjustmentIndex: adjIndex,
                        field: 'qty',
                        message: 'Quantity must be greater than 0',
                    })
                    invoiceState.value.formErrors.push(
                        `Product #${index + 1}, Adjustment #${adjIndex + 1}: Quantity must be greater than 0`
                    )
                    isValid = false
                }
            })
        })

        return isValid
    }

    const validateAndSave = () => {
        if (validateForm()) {
            saveInvoice()
        }
    }

    const saveInvoice = () => {
        // Create a deep copy
        const invoiceCopy = JSON.parse(JSON.stringify(invoiceState.value.products))

        // Add to saved invoices
        invoiceState.value.savedInvoices.push(invoiceCopy)

        console.log('Saving invoice:', JSON.stringify(invoiceState.value.products))
        alert('Invoice saved successfully!')

        // Reset 
        resetForm()
    }

    const loadInvoice = (invoice: Product[]) => {
 
        invoiceState.value.products = JSON.parse(JSON.stringify(invoice))
        // Clear validation
        invoiceState.value.validationErrors = []
        invoiceState.value.formErrors = []
    }

    const deleteSavedInvoice = (index: number) => {
        if (confirm('Are you sure you want to delete this invoice?')) {
            invoiceState.value.savedInvoices.splice(index, 1)
        }
    }

    return {
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
        deleteSavedInvoice
    }
}