import { BaseModel } from './base.model';
import { SupplierModel } from "./supplier.model";
import { ExpenseItemModel } from './expenseItem.model';
import { PaymentMethodModel } from './paymentMethod.model';
import { TaxModel } from './tax.model';
import { AttachmentModel } from './attachment.model';
import { ExpenseAttachmentModel } from './expenseAttachment.model';
export declare class ExpenseModel extends BaseModel {
    static tableName: string;
    expenseNumber: string;
    brandCode: string;
    description: string;
    category: string;
    date: Date;
    dueDate: Date;
    currencyCode: string;
    exchangeRate: number;
    billingAddress: string;
    taxRate: number;
    discount: number;
    subTotalAmount: number;
    totalAmount: number;
    supplierName: string;
    supplierLogo: string;
    supplierPhoneNumbers: string;
    supplierSupplierType: string;
    supplierBusinessType: string;
    supplierEmail: string;
    supplierWebsite: string;
    supplierAddress: string;
    taxName: string;
    bankFee: number;
    paymentMethodId: number;
    supplierId: number;
    taxId: number;
    supplier: SupplierModel;
    paymentMethod: PaymentMethodModel;
    tax: TaxModel;
    expenseItems: ExpenseItemModel[];
    attachments: AttachmentModel[];
    expenseAttachments: ExpenseAttachmentModel[];
    static relationMappings: {
        expenseItems: {
            modelClass: string;
            relation: import("objection").RelationType;
            join: {
                from: string;
                to: string;
            };
        };
        supplier: {
            modelClass: string;
            relation: import("objection").RelationType;
            join: {
                from: string;
                to: string;
            };
        };
        tax: {
            modelClass: string;
            relation: import("objection").RelationType;
            join: {
                from: string;
                to: string;
            };
        };
        paymentMethod: {
            modelClass: string;
            relation: import("objection").RelationType;
            join: {
                from: string;
                to: string;
            };
        };
        attachments: {
            modelClass: string;
            relation: import("objection").RelationType;
            join: {
                from: string;
                through: {
                    from: string;
                    to: string;
                };
                to: string;
            };
        };
        expenseAttachments: {
            modelClass: string;
            relation: import("objection").RelationType;
            join: {
                from: string;
                to: string;
            };
        };
    };
}
export default ExpenseModel;
