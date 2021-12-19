import { CreateInvoiceItemDto } from './create-invoice.dto';
export declare class PassCreateInvoiceDto {
    invoiceNumber: string;
    date: any;
    dueDate: any;
    brandCode: string;
    subTotalAmount: number;
    createdBy: string;
    taxRate: number;
    exchangeRate: number;
    totalAmount: number;
    discount: number;
}
export declare class PassCreateInvoiceItemDto extends CreateInvoiceItemDto {
    invoiceId: number;
    name: string;
    category: string;
    description: string;
    billingAddress: string;
    paymentMethod: string;
    brandCode: string;
    itemId: number;
    unitPrice: number;
    qty: number;
    purchasedAt: Date;
    expireDate: Date;
    supplier: string;
}
