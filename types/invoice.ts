export interface Adjustment {
    item: string;
    adjustment: string;
    batch: string;
    qty: number;
    id?: string; 
}

export interface Product {
    name: string;
    type: string;
    qty: number;
    receiveQty: number;
    rate: number;
    adjustments: Adjustment[];
}

export interface ValidationError {
    productIndex: number;
    field: string;
    message: string;
    adjustmentIndex?: number;
}

export interface InvoiceState {
    products: Product[]
    savedInvoices: Product[][]
    validationErrors: ValidationError[]
    formErrors: string[]

}