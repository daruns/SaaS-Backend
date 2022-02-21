import { BaseModel } from './base.model';
import { Model } from 'objection';
import { SupplierModel } from "./supplier.model";
import { ExpenseItemModel } from './expenseItem.model';
import { PaymentMethodModel } from './paymentMethod.model';
import { TaxModel } from './tax.model';
import { AttachmentModel } from './attachment.model';
import { ExpenseAttachmentModel } from './expenseAttachment.model';

const tableName = 'expenses'
export class ExpenseModel extends BaseModel {
  static tableName = tableName;

  expenseNumber: string
  brandCode: string
  description: string
  category: string
  date: Date
  dueDate: Date
  currencyCode: string
  exchangeRate: number
  billingAddress: string
  taxRate: number
  discount: number
  subTotalAmount: number
  totalAmount: number
  //supplier Columns
  supplierName: string
  supplierLogo: string
  supplierPhoneNumbers: string
  supplierSupplierType: string
  supplierBusinessType: string
  supplierEmail: string
  supplierWebsite: string
  supplierAddress: string
  //tax Columns
  taxName: string
  bankFee: number
  paymentMethodId: number
  supplierId: number
  taxId: number

  supplier: SupplierModel;
  paymentMethod: PaymentMethodModel;
  tax: TaxModel;
  expenseItems: ExpenseItemModel[];
  attachments: AttachmentModel[];
  expenseAttachments: ExpenseAttachmentModel[];

  static relationMappings = {
    expenseItems: {
      modelClass: `${__dirname}/expenseItem.model`,
      relation: Model.HasManyRelation,
      join: {
        from: `${tableName}.id`,
        to: 'expenseItems.expenseId',
      },
    },
    supplier: {
      modelClass: `${__dirname}/supplier.model`,
      relation: Model.BelongsToOneRelation,
      join: {
        from: `${tableName}.supplierId`,
        to: 'suppliers.id',
      },
    },
    tax: {
      modelClass: `${__dirname}/tax.model`,
      relation: Model.BelongsToOneRelation,
      join: {
        from: `${tableName}.taxId`,
        to: 'taxes.id',
      },
    },
    paymentMethod: {
      modelClass: `${__dirname}/paymentMethod.model`,
      relation: Model.BelongsToOneRelation,
      join: {
        from: `${tableName}.paymentMethodId`,
        to: 'paymentMethods.id',
      },
    },
    attachments: {
      modelClass: `${__dirname}/attachment.model`,
      relation: Model.ManyToManyRelation,
      join: {
        from: `${tableName}.id`,
        through: {
          from: 'expenseAttachments.expenseId',
          to: 'expenseAttachments.attachmentId'
        },
        to: 'attachments.id',
      },
    },
    expenseAttachments: {
      modelClass: `${__dirname}/expenseAttachment.model`,
      relation: Model.HasManyRelation,
      join: {
        from: `${tableName}.id`,
        to: 'expenseAttachments.expenseId',
      },
    },
  };
}

export default ExpenseModel
