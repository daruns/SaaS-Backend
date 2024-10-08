export declare class CreateExpenseDto {
    date: Date;
    dueDate: Date;
    billingAddress: string;
    description: string;
    category: string;
    discount: number;
    currencyCode: string;
    exchangeRate: number;
    paymentMethodId: number;
    taxId: number;
    supplierId: number;
    bankFee: number;
}
export declare class CreateExpenseItemDto {
    expenseId: number;
    name: string;
    description: string;
    brandCode: string;
    itemId: number;
    category: boolean;
    unitPrice: number;
    qty: number;
}
