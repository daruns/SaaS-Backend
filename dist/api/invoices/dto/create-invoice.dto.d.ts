export declare class CreateInvoiceDto {
    date: Date;
    dueDate: Date;
    billingAddress: string;
    description: string;
    paymentMethod: string;
    discount: number;
    taxRate: number;
    exchangeRate: number;
    currencyCode: string;
    clientContactId: number;
    clientId: number;
    status: string;
}
export declare class CreateInvoiceItemDto {
    invoiceId: number;
    name: string;
    category: string;
    description: string;
    brandCode: string;
    itemId: number;
    unitPrice: number;
    qty: number;
    purchasedAt: Date;
    expireDate: Date;
    supplier: string;
}
