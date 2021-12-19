export declare class PassCreateExpenseDto {
    expenseNumber: string;
    date: any;
    dueDate: any;
    brandCode: string;
    subTotalAmount: number;
    createdBy: string;
    taxRate: number;
    exchangeRate: number;
    totalAmount: number;
    discount: number;
    taxId: number;
    paymentMethodId: number;
    supplierId: number;
}
export declare class PassCreateExpenseItemDto {
    expenseId: number;
    name: string;
    description: string;
    brandCode: string;
    unitPrice: number;
    qty: number;
    createdBy: string;
}
